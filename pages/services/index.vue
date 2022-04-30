<template>
    <div class="container space-y-10 mt-10">
        <div>
            <input v-model="kw" type="text" placeholder="search for service">
            <button class="border-1 border-dark-800" @click="search();">
                search
            </button>
        </div>

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

        <NewService />
    </div>
</template>

<script lang="ts" setup>
    import { onBeforeRouteUpdate } from "vue-router";

    definePageMeta({
        middleware: ["auth"]
    });

    const client = useSupabaseClient();
    const results = ref([] as RatedService[]);
    const kw = ref("");

    const updateServices = (newServices: RatedService[]): void => {
        results.value = [];
        results.value.push(...newServices);
    };

    const { data: services } = await useAsyncData("services", async(): Promise<RatedService[]> => {
        try {
            const { data, error } = await client.from("services").select("id, name, description, ratings(id, userId, stars)").limit(100).order("created_at", { foreignTable: "ratings" });

            if (error)
                throwError(error.toString());
            return data as RatedService[];
        } catch (e) {
            console.error(e);
            return [] as RatedService[];
        }
    }, {
        transform: (data: RatedService[]) => {
            return data.map((service: RatedService) => {
                return {
                    id: service.id,
                    name: service.name,
                    description: service.description,
                    ratings: service.ratings,
                    averageRating: useAverage(service.ratings.map((rating: Rating) => rating.stars)),
                    totalRatings: service.ratings.length
                };
            });
        },
        initialCache: false
    });

    updateServices(services.value);

    const search = async() => {
        const term = useSearchTerm(kw.value);

        console.log(`searching ${term}`);

        const { data: services } = await useAsyncData(`search-services-${term}`, async(): Promise<RatedService[]> => {
            try {
                const { data, error } = await client.from("services").select("id, name, description, ratings(id, userId, stars)").textSearch("name", `${term}`).limit(100);

                if (error)
                    throwError(error.toString());
                return data as RatedService[];
            } catch (e) {
                console.error(e);
                return [] as RatedService[];
            }
        }, {
            server: false
        });

        updateServices(services.value);
    };
</script>
