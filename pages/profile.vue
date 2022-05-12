<template>
    <NuxtLayout name="contained">
        <Head>
            <Title v-if="user">
                {{ user.user_metadata.name }}'s profile
            </Title>
            <Title v-else>
                Profile
            </Title>
        </Head>

        <StructureBreadcrumbs />

        <article v-if="user" class="border-2 border-gray-100 rounded-xl mt-10">
            <div class="flex flex-col space-y-4 lg:(flex-row space-y-0) justify-between p-6">
                <div class="flex items-start">
                    <div class="shrink-0">
                        <UserAvatar :src="user.user_metadata.picture !== '' ? user.user_metadata.picture : 'empty'" size="medium" />
                    </div>

                    <div class="ml-4">
                        <div class="flex font-medium sm:text-lg items-center space-x-2">
                            <p class="truncate">
                                {{ user.user_metadata.name }}
                            </p>
                        </div>

                        <p class="text-sm text-gray-700 truncate">
                            {{ user.user_metadata.email }}
                        </p>
                    </div>
                </div>
                <div>
                    <div class="inline-flex items-center -space-x-px text-xs rounded-md">
                        <button
                            class="px-5 py-3 font-medium border rounded-l-md hover:z-10 focus:outline-none hover:bg-gray-50 active:opacity-75"
                            type="button"
                            @click="open = true"
                        >
                            Edit
                        </button>

                        <button
                            class="px-5 py-3 font-medium border rounded-r-md hover:z-10 focus:outline-none hover:bg-gray-50 active:opacity-75"
                            type="button"
                            @click="logout()"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <ul class="sm:grid sm:grid-cols-2 lg:grid-cols-3">
                <li class="p-8">
                    <p class="text-3xl font-extrabold ml-2">
                        {{ statistics.averageRating }}
                    </p>
                    <div class="mt-1 text-xl font-medium">
                        <StarRating :stars="statistics.averageRating" :static="true" />
                        <p class="mt-1 text-xs text-gray-500 pl-2">
                            Based on {{ statistics.totalRatings }} ratings
                        </p>
                    </div>
                </li>

                <li class="p-8">
                    <p class="text-3xl font-extrabold">
                        {{ ratings.length }}
                    </p>
                    <p class="mt-1 text-xl font-medium">
                        People rated
                    </p>
                </li>

                <li class="p-8">
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

    const { userLogout } = useAuth();
    const user = useSupabaseUser();
    const client = useSupabaseClient();
    const router = useRouter();
    const open = ref(false);

    const { data: statistics } = await useAsyncData("profile", async () => {
        const { data, error } = await client.from("services").select("name, ratings(userId, created_at, stars)").eq("id", user.value!.id).single();
        if (error) {
            console.error("Can't get user statistics", error);
            return null;
        }
        return data;
    }, {
        transform: (data) => {
            return {
                name: data.name,
                email: user.value!.email,
                ratings: data.ratings,
                averageRating: useAverage(data.ratings.map((rating: Rating) => rating.stars)),
                totalRatings: data.ratings.length
            };
        }
    });

    const { data: ratings } = await useAsyncData("ratings", async () => {
        const { data, error } = await client.from("ratings").select("id, serviceId (name), stars").eq("userId", user.value!.id);
        if (error) {
            console.error("Can't get ratings", error);
            return null;
        }
        return data;
    });

    const logout = async () => {
        const { error, message } = await userLogout();

        if (error) {
            console.error(`Can't logout: ${message}`);
        } else {
            router.push("/");
        }
    };
</script>
