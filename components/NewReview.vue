<template>
    <div class="container flex flex-col space-y-4">
        <p class="font-bold">
            Add or update review for {{ props.serviceId }}:
        </p>
        <input v-model="newReview.stars" type="number" min="1" max="5" class="border-1 border-dark-800" placeholder="stars">

        <div class="flex space-x-4">
            <button class="border-1 border-dark-800 inline" :disabled="!newReview.stars" :class="{'cursor-not-allowed' : !newReview.stars}" @click="exists ? update() : post()">
                {{ exists ? "update" : "post" }}
            </button>
            <button v-if="exists" class="border-1 border-dark-800 inline" @click="remove()">
                delete
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { v4 as uuidV4 } from "uuid";

    const user = useSupabaseUser();
    const client = useSupabaseClient();

    const props = defineProps({
        serviceId: {
            type: String,
            required: true
        },
        exists: {
            type: Boolean,
            required: true
        }
    });

    const newReview = reactive<Rating>({
        id: uuidV4(),
        userId: user.value.id,
        serviceId: props.serviceId,
        stars: null
    });

    const post = async() => {
        const { error } = await client.from("reviews").insert(newReview);

        if (error) {
            console.error("Error creating new review", error);
        } else {
            newReview.id = uuidV4();
            newReview.stars = null;
        }
    };

    const update = async() => {
        const { error } = await client.from("reviews").update({ stars: newReview.stars }).match({
            userId: user.value.id,
            serviceId: props.serviceId
        });

        if (error) {
            console.error("Error updating review", error);
        } else {
            newReview.id = uuidV4();
            newReview.stars = null;
        }
    };

    const remove = async() => {
        if (confirm("Are you sure to delete this review?")) {
            const { data, error } = await client.from("reviews").delete().match({ serviceId: props.serviceId, userId: user.value.id });

            if (error) {
                console.error("Error updating review", error);
            } else {
                console.log("Review deleted", data);
            }
        }
    };
</script>
