<template>
    <div container>
        <article class="bg-white border-2 border-gray-100 rounded-xl">
            <div class="flex items-start p-6">
                <div class="shrink-0">
                    <UserAvatar :src="user.user_metadata.picture" size="medium" />
                </div>

                <div class="ml-4">
                    <p class="font-medium sm:text-lg">
                        {{ statistics.name }}
                    </p>

                    <p class="text-sm text-gray-700 line-clamp-2">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus,
                        accusantium temporibus iure delectus ut totam natus nesciunt ex?
                        Ducimus, enim.
                    </p>

                    <span class="hidden sm:block" aria-hidden="true">&middot;</span>

                    <p class="hidden sm:block sm:text-xs sm:text-gray-500">
                        {{ statistics.username }}
                    </p>
                </div>
            </div>

            <div class="flex justify-end">
                <strong
                    class="-mr-[2px] -mb-[2px] inline-flex items-center gap-2 rounded-tl-xl rounded-br-xl bg-green-600 py-1.5 px-3 text-white"
                >
                    <div class="i-fa-solid-user w-3 h-3" />
                    <span class="text-[10px] font-medium sm:text-xs">Text</span>
                </strong>
            </div>
        </article>

        <div class="mt-2 sm:flex sm:items-center sm:gap-2">
            <div class="flex items-center space-x-4 mt-4">
                <p class="text-3xl font-medium">
                    {{ statistics.averageRating }}
                    <span class="sr-only"> Average review score </span>
                </p>

                <div class="space-y-1">
                    <StarRating :stars="statistics.averageRating" :static="true" />

                    <p class="mt-1 text-xs text-gray-500 pl-2">
                        Based on {{ statistics.totalRatings }} ratings
                    </p>
                </div>
            </div>
        </div>
    </div>
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
</script>
