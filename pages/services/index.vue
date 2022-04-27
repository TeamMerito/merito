<template>
    <div class="container space-y-10">
        <div>
            Services:

            <ul>
                <li v-for="serv in services" :key="serv.id">
                    <NuxtLink :to="`/services/${serv.id}`">
                        <pre>{{ serv }}</pre>
                    </NuxtLink>
                </li>
            </ul>
        </div>

        <NewService />
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({
        middleware: ["auth"]
    });

    const client = useSupabaseClient();

    const { data: services } = await useAsyncData("services", async() => {
        const { data, error } = await client.from("services").select("id, name, description");

        if (error) {
            console.error(error);
            return [];
        }
        return data;
    });

    services.value.forEach(async(service) => {
        const { data } = await useAsyncData("review", async() => {
            const { data, error } = await client.from("reviews").select("stars").eq("serviceId", service.id);

            if (error) {
                console.error(error);
                return [];
            }

            return data;
        });

        service.stars = data.value.map(review => review.stars);
        service.average = useAverage(service.stars);
    });
</script>
