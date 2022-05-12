<template>
    <NuxtLayout name="contained">
        <Head>
            <Title>Ratings</Title>
        </Head>

        <StructureBreadcrumbs />

        <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            <NuxtLink v-for="rating in ratings" :key="rating.id" :to="`/services/${rating.serviceId.id}`" class="group relative">
                <div class="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                    <img src="https://via.placeholder.com/500" alt="" class="w-full h-full object-center object-cover lg:w-full lg:h-full">
                </div>
                <div class="mt-4 flex flex-col justify-between">
                    <h3 class="text-sm font-medium text-gray-900 space-y-2 pl-2">
                        {{ rating.serviceId.name }}
                    </h3>
                    <StarRating :static="true" :stars="rating.stars.toString()" />
                </div>
            </NuxtLink>
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
    const client = useSupabaseClient();
    const user = useSupabaseUser();

    definePageMeta({
        middleware: ["auth", "admin"]
    });

    const { data: ratings } = await useAsyncData("ratings", async () => {
        const { data, error } = await client.from("ratings").select("id, serviceId (id, name), userId, stars").eq("userId", user.value!.id);

        if (error) {
            console.error("Error getting ratings: ", error);
            return [];
        }

        return data;
    });
</script>
