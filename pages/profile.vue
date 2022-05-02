<template>
    <div class="container">
        <UserAvatar :src="user.user_metadata.picture" size="medium" />

        <div class="flex">
            <p>Rated {{ statistics.totalRatings }} times</p>
        </div>

        <pre>{{ statistics }}</pre>
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
    }, {
        transform: (data) => {
            return {
                name: data.name,
                email: user.value!.email,
                username: user.value!.email?.split("@")[0],
                ratings: data.ratings,
                averageRating: useAverage(data.ratings.map((rating: Rating) => rating.stars)),
                totalRatings: data.ratings.length
            };
        }
    });
</script>
