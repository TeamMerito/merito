<template>
    <div>
        <UserAvatar :src="user.user_metadata.picture" size="medium" />

        <div>
            My statistics: <pre>{{ statistics }}</pre>
        </div>

        <textarea v-model="prettyUser" class="border-1 border-dark-800" rows="10" />
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({
        middleware: ["auth"]
    });

    const user = useSupabaseUser();
    const client = useSupabaseClient();

    const { data: statistics } = await useAsyncData("profile", async() => {
        try {
            const { data, error } = await client.from("services").select("name, ratings(userId, stars)").eq("id", user.value!.id).single();
            if (error) {
                throwError(error.message);
            }
            return data;
        } catch (e) {
            console.error("Can't get user statistics", e);
            return null;
        }
    });

    const prettyUser = usePrettify(user.value);
</script>
