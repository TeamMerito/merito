<template>
    <div>
        Service:
        <pre>{{ service }}</pre>

        <NewReview :service-id="service.id" />
    </div>
</template>

<script lang="ts" setup>
    const client = useSupabaseClient();
    const route = useRoute();

    const { data: service } = await useAsyncData("service", async() => {
        const { data } = await client.from("services").select("id, name").eq("id", route.params.id).single();
        return data;
    });
</script>
