<template>
    <div class="container">
        <p>Search user:</p>
        <input v-model="kw" type="text" class="border-1 border-dark-800" placeholder="search" @keyup.enter="search()">
        <button class="border-1 border-dark-800" @click="search()">
            search
        </button>

        <div class="mt-7">
            <ClientOnly>
                <NuxtLink v-for="user in results" :key="user.id" :to="user.id === me.id ? '/profile' : `/services/${user.id}`" class="mt-10" @click="user.id !== me.id ? addToHistory(user) : ''">
                    <div class="flex">
                        <UserAvatar :src="user.picture" size="small" />
                        <p>{{ user.name }} ({{ user.userName }})</p>
                    </div>
                </NuxtLink>
            </ClientOnly>
        </div>

        <div v-if="history.length">
            <ClientOnly>
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
            </ClientOnly>
        </div>
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({
        middleware: ["auth"]
    });

    const kw = ref("");
    const results = ref<FullUser[]>([]);
    const client = useSupabaseClient();
    const me = useSupabaseUser();
    const { history, addToHistory, removeFromHistory } = useHistory();

    const search = async() => {
        const { data } = await useAsyncData(`search-${kw.value}`, async(): Promise<FullUser[]> => {
            const { data, error } = await client.from("users").select("id, name, picture, email").ilike("email", `%${kw.value}%`).limit(10);

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

        results.value = [];
        results.value.push(...data.value);
    };
</script>
