<template>
    <div>
        My ratings:
        <pre>{{ ratings }}</pre>
    </div>
</template>

<script lang="ts" setup>
    const client = useSupabaseClient();
    const user = useSupabaseUser();

    definePageMeta({
        middleware: ["auth"]
    });

    const { data: ratings } = await useAsyncData("ratings", async() => {
        const { data } = await client.from("reviews").select("id, serviceId (name), stars").eq("userId", user.value.id);
        return data;
    });
</script>
