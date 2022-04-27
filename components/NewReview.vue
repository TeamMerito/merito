<template>
    <div class="flex flex-col space-y-4">
        <p class="font-bold">
            Add review:
        </p>
        <input v-model="newReview.stars" type="number" min="1" max="5" class="border-1 border-dark-800" placeholder="desc">

        <button class="border-1 border-dark-800 inline" @click="post()">
            post
        </button>
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
        }
    });

    const newReview = reactive<Rating>({
        id: uuidV4(),
        userId: user.value.id,
        serviceId: props.serviceId,
        stars: 0
    });

    const post = async() => {
        const { data, error } = await client.from("reviews").insert([newReview]);

        if (error) {
            console.error("Error creating new review", error);
        } else {
            console.log(data);
            newReview.id = uuidV4();
            newReview.stars = 0;
        }
    };
</script>
