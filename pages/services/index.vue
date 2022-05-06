<template>
    <div class="container">
        <p>Search service:</p>
        <input v-model="kw" type="text" class="border-1 border-dark-800" placeholder="search for service">

        <div class="mt-7">
            <ClientOnly>
                <p>currentPage: {{ currentPage }}</p>
                <p>totalItems: {{ totalItems }}</p>
                <p>pages: {{ pages }}</p>
                <pre>result: {{ result }}</pre>

                <div class="flex flex-col space-y-3">
                    <NuxtLink v-for="serv in results" :key="serv.id" :to="`/services/${serv.id}`" class="mt-10">
                        {{ serv.name }} {{ serv.averageRating !== null ? `(${serv.averageRating} stars)` : '- not rated yet' }}
                    </NuxtLink>
                </div>
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

        <NewService />
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({
        middleware: ["auth"]
    });

    const client = useSupabaseClient();
    const results = ref<RatedService[]>([]);
    const kw = useDebouncedRef("", 300);
    const alreadySearched = ref(false);
    const { result, currentPage, totalItems, pages, prev, next } = usePagination(results, 5);

    const updateServices = (newServices: RatedService[]): void => {
        results.value = [];
        results.value.push(...newServices);
        alreadySearched.value = true;
    };

    const { data: services } = await useAsyncData("services", async (): Promise<RatedService[]> => {
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

    const search = async (term: string) => {
        const { data: services } = await useAsyncData(`search-services-${term}`, async (): Promise<RatedService[]> => {
            try {
                const { data, error } = await client.from("services").select("id, name, description, ratings(id, userId, stars)").ilike("name", `%${term}%`).limit(100);

                if (error)
                    throwError(error.toString());
                return data as RatedService[];
            } catch (e) {
                console.error(e);
                return [] as RatedService[];
            }
        }, {
            server: false,
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
            }
        });

        updateServices(services.value);
    };

    watch(kw, (newVal) => {
        if (newVal !== "") {
            search(newVal);
        } else {
            search("*");
        }
    });
</script>
