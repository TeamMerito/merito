<template>
    <NuxtLayout name="contained">
        <div class="max-w-3xl mx-auto">
            <div class="relative">
                <label class="sr-only" for="username"> Username </label>

                <span class="absolute text-gray-500 -translate-y-1/2 pointer-events-none top-1/2 left-4">
                    <div class="i-heroicons-outline-at-symbol w-5 h-5" />
                </span>

                <input
                    id="username"
                    v-model="kw"
                    class="w-full py-3 pl-12 pr-3 text-sm border-2 border-gray-200 rounded"
                    type="text"
                    placeholder="Username"
                >
            </div>

            <p v-if="alreadySearched && kw.value !== ''" class="text-right mt-3 mb-1">
                {{ totalItems }} results found
            </p>

            <div class="space-y-1">
                <div v-for="user in result" :key="user.id">
                    <NuxtLink :to="user.id === me.id ? '/profile' : `/services/${user.id}`" class="flex items-center justify-between p-4 text-sm font-medium transition-colors border border-gray-100 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50" @click="addToHistory(user)">
                        <div class="flex items-center space-x-2">
                            <UserAvatar :src="user.picture" size="small" />
                            <div>
                                <p>{{ user.name }}</p>
                                <p class="text-gray-400">
                                    ({{ user.userName }})
                                </p>
                            </div>
                        </div>

                        <span>
                            <div class="i-heroicons-outline-arrow-narrow-right text-gray-500 w-6 h-6" />
                        </span>
                    </NuxtLink>
                </div>
            </div>

            <div v-if="pages !== 0" class="flex justify-center mt-7">
                <ClientOnly>
                    <div class="inline-flex items-center justify-center space-x-3">
                        <button class="inline-flex items-center justify-center w-8 h-8 border border-gray-100 rounded" @click="prev()">
                            <div class="i-heroicons-outline-chevron-left w-3 h-3" />
                        </button>

                        <p class="text-xs">
                            {{ currentPage }}
                            <span class="mx-0.25">/</span>
                            {{ pages }}
                        </p>

                        <button class="inline-flex items-center justify-center w-8 h-8 border border-gray-100 rounded" @click="next()">
                            <div class="i-heroicons-outline-chevron-right w-3 h-3" />
                        </button>
                    </div>
                </ClientOnly>
            </div>

            <ClientOnly>
                <div v-if="history.length">
                    <div class="flex justify-between mt-5 mb-3 px-1">
                        <p>
                            Your search history
                        </p>

                        <button class="px-4 py-2 text-sm font-medium text-orange-600 rounded bg-orange-50" @click="cleanAll()">
                            Clean all
                        </button>
                    </div>

                    <div v-for="user in history" :key="`history-${user.id}`">
                        <NuxtLink :to="`/services/${user.id}`" class="flex items-center justify-between p-4 text-sm font-medium transition-colors border border-gray-100 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50" @click="addToHistory(user)">
                            <div class="flex items-center space-x-2">
                                <UserAvatar :src="user.picture" size="small" />
                                <div>
                                    <p>{{ user.name }}</p>
                                    <p class="text-gray-400">
                                        ({{ user.userName }})
                                    </p>
                                </div>
                            </div>

                            <button class="w-10 h-10 bg-gray-200 rounded-lg" @click.prevent="removeFromHistory(user)">
                                <div class="i-heroicons-outline-x text-gray-500 w-6 h-6 mx-auto" />
                            </button>
                        </NuxtLink>
                    </div>
                </div>
            </ClientOnly>
        </div>

        <Modal :open="open" @confirm="deleteHistory()" @close="open = false" />
    </NuxtLayout>
</template>

<script lang="ts" setup>
    definePageMeta({
        middleware: ["auth"]
    });

    const alreadySearched = ref(false);
    const kw = useDebouncedRef("", 300);
    const results = ref<FullUser[]>([]);
    const client = useSupabaseClient();
    const me = useSupabaseUser();
    const loading = ref(false);
    const open = ref(false);
    const { history, addToHistory, removeFromHistory, deleteHistory } = useHistory();
    const { result, currentPage, totalItems, pages, prev, next } = usePagination(results, 5);

    const search = async (term: string) => {
        const { data, pending } = await useAsyncData(`search-${term}`, async (): Promise<FullUser[]> => {
            const { data, error } = await client.from("users").select("id, name, picture, email").ilike("email", `%${term}%`).limit(100);

            if (error) {
                console.error("error searching user: ", error);
                return [] as FullUser[];
            }

            return data;
        }, {
            server: false,
            transform: (data) => {
                return data.map((user: FullUser) => {
                    return {
                        id: user.id,
                        name: user.name,
                        picture: user.picture,
                        email: user.email,
                        userName: user.email?.split("@")[0]
                    };
                });
            }
        });

        loading.value = pending.value;
        results.value = [];
        results.value.push(...data.value);
        alreadySearched.value = true;
    };

    const cleanAll = () => {
        open.value = true;
    };

    watch(kw, (newVal) => {
        if (newVal !== "") {
            search(newVal);
        } else {
            results.value = [];
        }
    });
</script>
