<template>
    <div>
        Service:
        <pre>{{ service }}</pre>

        <NewReview v-if="service.id !== user.id" :service-id="service.id" :exists="alreadySubmitted()" />
        <strong v-else>
            You can't vote yourself
        </strong>
    </div>
</template>

<script lang="ts" setup>
    const user = useSupabaseUser();
    const client = useSupabaseClient();
    const route = useRoute();

    const { data: service } = await useAsyncData("service", async() => {
        const { data } = await client.from("services").select("id, name, reviews(userId, stars)").eq("id", route.params.id).single();
        return data;
    });

    const alreadySubmitted = (): boolean => {
        if (service.value.reviews.some((review: Rating) => review.userId === user.value.id)) {
            return true;
        }

        return false;
    };
</script>
