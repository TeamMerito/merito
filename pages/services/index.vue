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

    const { data: services } = await useAsyncData("services", async(): Promise<Service[]> => {
        try {
            const { data, error }: { data: Service[]; error: any } = await (await client.from("services").select("id, name, description, reviews(id, userId, stars)").limit(100));

            if (error)
                throw error;
            return data;
        } catch (e) {
            console.error(e);
            return [] as Service[];
        }
    });
</script>
