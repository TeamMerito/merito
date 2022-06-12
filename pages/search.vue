<template>
    <NuxtLayout name="contained">
        <Head>
            <Title>Search</Title>
        </Head>

        <StructureBreadcrumbs />

        <div class="mx-auto max-w-3xl">
            <div class="relative">
                <label class="sr-only" for="name"> Name </label>

                <span class="top-1/2 left-4 text-gray-500 -translate-y-1/2 absolute pointer-events-none">
                    <div class="h-5 w-5 i-heroicons-outline-at-symbol" />
                </span>

                <input
                    id="name"
                    v-model="kw"
                    class="rounded border-2 border-gray-200 text-sm w-full py-3 pr-3 pl-12"
                    type="text"
                    placeholder="Name"
                >
            </div>

            <p v-if="alreadySearched && kw.value !== ''" class="mt-3 text-right mb-1">
                {{ totalItems }} results found
            </p>

            <div class="space-y-1">
                <div v-for="user in result" :key="user.id">
                    <NuxtLink :to="user.id === me.id ? '/profile' : `/services/${user.id}`" class="border rounded-lg cursor-pointer flex font-medium border-gray-100 shadow-sm text-sm p-4 transition-colors items-center justify-between hover:bg-gray-50" @click="addToHistory(user)">
                        <div class="flex space-x-2 items-center">
                            <UserAvatar :src="user.picture" size="small" />
                            <div>
                                <p>{{ user.name }}</p>
                            </div>
                        </div>

                        <span>
                            <div class="h-6 text-gray-500 w-6 i-heroicons-outline-arrow-narrow-right" />
                        </span>
                    </NuxtLink>
                </div>
            </div>

            <div v-if="pages !== 0" class="flex mt-7 justify-center">
                <ClientOnly>
                    <div class="space-x-3 inline-flex items-center justify-center">
                        <button class="border rounded border-gray-100 h-8 w-8 inline-flex items-center justify-center" @click="prev()">
                            <div class="h-3 w-3 i-heroicons-outline-chevron-left" />
                        </button>

                        <p class="text-xs">
                            {{ currentPage }}
                            <span class="mx-0.25">/</span>
                            {{ pages }}
                        </p>

                        <button class="border rounded border-gray-100 h-8 w-8 inline-flex items-center justify-center" @click="next()">
                            <div class="h-3 w-3 i-heroicons-outline-chevron-right" />
                        </button>
                    </div>
                </ClientOnly>
            </div>

            <ClientOnly>
                <div v-if="history.length">
                    <div class="flex mt-5 mb-3 px-1 justify-between">
                        <p>
                            Your search history
                        </p>

                        <button class="rounded font-medium bg-orange-50 text-sm py-2 px-4 text-orange-600" @click="open = true">
                            Clean all
                        </button>
                    </div>

                    <div v-for="user in history" :key="`history-${user.id}`" class="flex space-x-3 items-center">
                        <NuxtLink :to="`/services/${user.id}`" class="border rounded-lg cursor-pointer flex font-medium border-gray-100 flex-1 shadow-sm text-sm p-4 transition-colors items-center justify-between hover:bg-gray-50" @click="addToHistory(user)">
                            <div class="flex space-x-2 items-center">
                                <UserAvatar :src="user.picture" size="small" />
                                <div>
                                    <p>{{ user.name }}</p>
                                </div>
                            </div>
                        </NuxtLink>

                        <button class="rounded-lg bg-gray-200 h-10 w-10" @click="removeFromHistory(user.id)">
                            <div class="mx-auto h-6 text-gray-500 w-6 i-heroicons-outline-x" />
                        </button>
                    </div>
                </div>
            </ClientOnly>
        </div>

        <Modal :open="open" @confirm="deleteHistory()" @close="open = false">
            <h2 class="font-bold text-lg">
                Delete all history?
            </h2>

            <p class="mt-2 text-sm text-gray-500">
                The action cannot be undone.
            </p>

            <div class="flex mt-8 text-xs items-center justify-end">
                <button type="button" class="rounded font-medium bg-orange-50 py-2 px-4 text-orange-600" @click="deleteHistory(); open = false">
                    Yes, I'm sure
                </button>
                <button type="button" class="rounded font-medium bg-gray-50 ml-2 py-2 px-4 text-gray-600" @click="open = false">
                    No, go back
                </button>
            </div>
        </Modal>
    </NuxtLayout>
</template>

<script lang="ts" setup>
    definePageMeta({
        middleware: ["auth"]
    });

    const alreadySearched = ref(false);
    const kw = useDebouncedRef("", 300);
    const results = ref<User[]>([]);
    const client = useSupabaseClient();
    const me = useSupabaseUser();
    const open = ref(false);
    const { history, addToHistory, removeFromHistory, deleteHistory } = useHistory();
    const { result, currentPage, totalItems, pages, prev, next } = usePagination(results, 5);

    const search = async (term: string) => {
        const { data } = await useAsyncData(`search-${term}`, async (): Promise<User[]> => {
            const { data, error } = await client.from("users").select("id, name, picture, email").ilike("name", `%${term}%`).limit(100);

            if (error) {
                console.error("error searching user: ", error);
                return [] as User[];
            }

            return data;
        }, {
            server: false,
            transform: (data) => {
                return data.map((user: User) => {
                    return {
                        id: user.id,
                        name: user.name,
                        picture: user.picture,
                        email: user.email
                    };
                });
            }
        });
        results.value = [];
        results.value.push(...data.value);
        alreadySearched.value = true;
    };

    watch(kw, (newVal) => {
        if (newVal !== "") {
            search(newVal);
        } else {
            results.value = [];
        }
    });
</script>
