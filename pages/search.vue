<template>
    <div class="container">
        <p>Search user:</p>
        <input v-model="kw" type="text" class="border-1 border-dark-800" placeholder="search">

        <div class="mt-7">
            <ClientOnly>
                <p>currentPage: {{ currentPage }}</p>
                <p>totalItems: {{ totalItems }}</p>
                <p>pages: {{ pages }}</p>
                <pre>result: {{ result }}</pre>
                
                <NuxtLink v-for="user in result" :key="user.id" :to="user.id === me.id ? '/profile' : `/services/${user.id}`" class="mt-10" @click="user.id !== me.id ? addToHistory(user) : ''">
                    <div class="flex">
                        <UserAvatar :src="user.picture" size="small" />
                        <p>{{ user.name }} ({{ user.userName }})</p>
                    </div>
                </NuxtLink>
                <div v-if="alreadySearched && results.length === 0 && kw !== ''">
                    No results found
                </div>
                <div class="inline-flex justify-center space-x-1">
                    <button class="inline-flex items-center justify-center w-8 h-8 border border-gray-100 rounded" @click="currentPage !== 1 ? prev() : ''">
                        <div class="i-fa-solid-chevron-left w-3 h-3 text-dark" />
                    </button>

                    <div class="inline-flex w-8 h-8 leading-8 mx-auto text-white bg-blue-600 border-blue-600 rounded">
                        {{ currentPage }}
                    </div>

                    <button class="inline-flex items-center justify-center w-8 h-8 border border-gray-100 rounded" @click="currentPage !== pages ? next() : ''">
                        <div class="i-fa-solid-chevron-right w-3 h-3 text-dark" />
                    </button>
                </div>
            </ClientOnly>
        </div>

        <ClientOnly>
            <div v-if="history.length">
                <p>Your search history:</p>
                <NuxtLink v-for="user in history" :key="`history-${user.id}`" :to="`/services/${user.id}`" class="mt-10">
                    <div class="flex space-x-2">
                        <UserAvatar :src="user.picture" size="small" />
                        <p>{{ user.name }} ({{ user.userName }})</p>
                        <button class="border-1 border-dark-800 w-5 h-5" @click.prevent="removeFromHistory(user)">
                            X
                        </button>
                    </div>
                </NuxtLink>
            </div>
        </ClientOnly>
    </div>
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
    const { history, addToHistory, removeFromHistory } = useHistory();
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

    watch(kw, (newVal) => {
        if (newVal !== "") {
            search(newVal);
        } else {
            results.value = [];
        }
    });
</script>
