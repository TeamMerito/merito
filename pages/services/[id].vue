<template>
    <NuxtLayout name="contained">
        <Head>
            <Title>Rate {{ user.name }}</Title>
        </Head>

        <div class="flex max-w-lg mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <img :src="user.picture" class="w-1/3 object-cover" :alt="user.name">

            <div class="w-2/3 p-4 md:p-4">
                <h1 class="text-2xl font-bold text-gray-800 dark:text-white">
                    {{ user.name }}
                </h1>

                <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Rated {{ service.totalRatings }} times
                </p>

                <StarRating :key="service.averageRating" :static="true" :stars="service.averageRating" class="-ml-2 mt-5" />

                <div class="flex justify-between mt-3 item-center">
                    <h1 class="text-gray-700 dark:text-gray-200 md:text-xl">
                        Average: <span class="text-lg font-bold">{{ service.averageRating }}</span>
                    </h1>
                </div>
            </div>
        </div>

        <NewRating v-if="service.id !== me.id" :service="service" :exists="alreadySubmitted()" @submitted="refresh()" @updated="refresh()" @deleted="refresh()" />
        <strong v-else>
            You can't rate yourself
        </strong>
    </NuxtLayout>
</template>

<script lang="ts" setup>
    definePageMeta({
        middleware: ["auth"]
    });

    const me = useSupabaseUser();
    const client = useSupabaseClient();
    const route = useRoute();

    const { data: user } = await useAsyncData(`user-${route.params.id}`, async () => {
        const { data } = await client.from("users").select("id, name, picture").eq("id", route.params.id).single();
        return data;
    });

    const { data: service, refresh } = await useAsyncData(`service-${route.params.id}`, async () => {
        const { data } = await client.from("services").select("id, name, ratings(userId, stars)").eq("id", route.params.id).single();
        return data;
    }, {
        transform: (data) => {
            return {
                id: data.id,
                name: data.name,
                ratings: data.ratings,
                averageRating: useAverage(data.ratings.map((rating: Rating) => rating.stars)),
                totalRatings: data.ratings.length
            };
        }
    });

    const alreadySubmitted = (): boolean => {
        if (service.value.ratings.some((rating: Rating) => rating.userId === me.value!.id)) {
            return true;
        }

        return false;
    };
</script>
