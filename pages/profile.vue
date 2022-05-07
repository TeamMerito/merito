<template>
    <NuxtLayout name="contained">
        <p class="text-3xl font-heading">
            My profile
        </p>
        <article class="bg-white border-2 border-gray-100 rounded-xl mt-10">
            <div class="flex items-start p-6">
                <div class="shrink-0">
                    <UserAvatar :src="user.user_metadata.picture" size="medium" />
                </div>

                <div class="ml-4">
                    <div class="flex font-medium sm:text-lg items-center space-x-2">
                        <p>{{ statistics.name }}</p>

                        <span class="hidden sm:block sm:text-xs sm:text-gray-500">
                            ({{ statistics.username }})
                        </span>
                    </div>

                    <p class="text-sm text-gray-700 line-clamp-2">
                        {{ statistics.email }}
                    </p>
                </div>
            </div>

            <ul class="border border-white sm:grid sm:grid-cols-2 lg:grid-cols-3">
                <li class="p-8 border border-white">
                    <p class="text-3xl font-extrabold ml-2">
                        {{ getScore(statistics.averageRating) }}
                    </p>
                    <div class="mt-1 text-xl font-medium">
                        <StarRating :stars="statistics.averageRating" :static="true" />
                        <p class="mt-1 text-xs text-gray-500 pl-2">
                            Based on {{ statistics.totalRatings }} ratings
                        </p>
                    </div>
                </li>

                <li class="p-8 border border-white">
                    <p class="text-3xl font-extrabold">
                        {{ ratings.length }}
                    </p>
                    <p class="mt-1 text-xl font-medium">
                        People rated
                    </p>
                </li>

                <li class="p-8 border border-white">
                    <p class="text-3xl font-extrabold">
                        Good
                    </p>
                    <p class="mt-1 text-xl font-medium">
                        Mostly good ratings
                    </p>
                </li>
            </ul>

            <div class="flex justify-end">
                <strong
                    class="-mr-[2px] -mb-[2px] inline-flex items-center gap-2 rounded-tl-xl rounded-br-xl bg-green-100 py-1.5 px-3 text-green-600"
                >
                    <div class="i-heroicons-outline-trending-up w-5 h-5" />
                    <span class="text-[10px] font-medium sm:text-sm">Rising</span>
                </strong>
            </div>
        </article>
    </NuxtLayout>
</template>

<script lang="ts" setup>
    definePageMeta({
        middleware: ["auth"]
    });

    const user = useSupabaseUser();
    const client = useSupabaseClient();

    const { data: statistics } = await useAsyncData("profile", async () => {
        try {
            const { data, error } = await client.from("services").select("name, ratings(userId, stars)").eq("id", user.value!.id).single();
            if (error) {
                throwError(error.message);
            }
            return data;
        } catch (e) {
            console.error("Can't get user statistics", e);
            return null;
        }
    }, {
        transform: (data) => {
            return {
                name: data.name,
                email: user.value!.email,
                username: user.value!.email?.split("@")[0],
                ratings: data.ratings,
                averageRating: useAverage(data.ratings.map((rating: Rating) => rating.stars)),
                totalRatings: data.ratings.length
            };
        }
    });

    const { data: ratings } = await useAsyncData("ratings", async () => {
        const { data } = await client.from("ratings").select("id, serviceId (name), stars").eq("userId", user.value!.id);
        return data;
    });

    const getScore = (num: number) => {
        return (Math.round(num * 100) / 100).toFixed(1);
    };
</script>
