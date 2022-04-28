<template>
    <div class="container space-y-10">
        <div>
            Services:

            <ul v-if="results.length">
                <li v-for="serv in results" :key="serv.id">
                    <NuxtLink :to="`/services/${serv.id}`">
                        <pre>{{ serv }}</pre>
                    </NuxtLink>
                </li>
            </ul>
            <p v-else>
                No results found
            </p>
        </div>

        <div>
            <input v-model="kw" type="text" placeholder="search for service">
            <button class="border-1 border-dark-800" @click="search();">
                search
            </button>
        </div>

        <NewService />
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({
        middleware: ["auth"]
    });

    const client = useSupabaseClient();
    const results = reactive([] as Service[]);
    const kw = ref("");

    const { data: services } = await useAsyncData("services", async(): Promise<Service[]> => {
        try {
            const { data, error }: { data: Service[]; error: any } = await client.from("services").select("id, name, description, reviews(id, userId, stars)").limit(100);

            if (error)
                throw error;
            return data;
        } catch (e) {
            console.error(e);
            return [] as Service[];
        }
    });

    results.length = 0;
    results.push(...services.value);

    const search = async() => {
        const term = kw.value.split(" ").map(word => `${word}:*`).join(" | ");

        console.log(`searching ${term}`);

        const { data: services } = await useAsyncData(`search-services-${term}`, async(): Promise<Service[]> => {
            try {
                const { data, error }: { data: Service[]; error: any } = await client.from("services").select("id, name, description, reviews(id, userId, stars)").textSearch("name", `${term}`).limit(100);

                if (error)
                    throw error;
                return data;
            } catch (e) {
                console.error(e);
                return [] as Service[];
            }
        }, { server: false });

        console.log("searched data is ", services.value);

        results.length = 0;
        results.push(...services.value);
    };
</script>
