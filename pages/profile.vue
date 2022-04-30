<template>
    <div>
        <UserAvatar :src="user.user_metadata.picture" size="medium" />

        <div>
            My statistics: <pre>{{ statistics }}</pre>
        </div>
        <pre>
            {{ user }}
        </pre>
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({
        middleware: ["auth"]
    });

    const user = useSupabaseUser();
    const client = useSupabaseClient();

    const { data: statistics } = await useAsyncData("profile", async() => {
        const { data, error } = await client.from("services").select("id, name, ratings(userId, stars)").eq("id", user.value!.id);

        if (error) {
            console.error("Can't get user statistics", error);
            return null;
        }

        return data;
    });
</script>
