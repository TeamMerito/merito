<template>
    <div>
        Service:
        <pre>{{ service }}</pre>

        <NewRating v-if="service.id !== user.id" :service-id="service.id" :exists="alreadySubmitted()" @submitted="refresh()" @updated="refresh()" @deleted="refresh()" />
        <strong v-else>
            You can't vote yourself
        </strong>
    </div>
</template>

<script lang="ts" setup>
    const user = useSupabaseUser();
    const client = useSupabaseClient();
    const route = useRoute();

    const { data: service, refresh } = await useAsyncData(`service-${route.params.id}`, async() => {
        const { data } = await client.from("services").select("id, name, ratings(userId, stars)").eq("id", route.params.id).single();
        return data;
    });

    const alreadySubmitted = (): boolean => {
        if (service.value.ratings.some((rating: Rating) => rating.userId === user.value!.id)) {
            return true;
        }

        return false;
    };
</script>
