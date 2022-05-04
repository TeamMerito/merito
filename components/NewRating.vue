<template>
    <div class="container flex flex-col space-y-4">
        <p class="font-bold">
            Add or update rating for {{ props.serviceId }}:
        </p>
        <input v-model="newRating.stars" type="number" min="1" max="5" class="border-1 border-dark-800" placeholder="stars">

        <div class="flex space-x-4">
            <button class="border-1 border-dark-800 inline" :disabled="!newRating.stars" :class="{ 'cursor-not-allowed': !newRating.stars }" @click="exists ? update() : post()">
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

    const emit = defineEmits(["submitted", "updated", "deleted"]);

    const user = useSupabaseUser();
    const client = useSupabaseClient();

    const newRating = reactive<Rating>({
        id: uuidV4(),
        userId: user.value!.id,
        serviceId: props.serviceId,
        stars: null
    });

    const post = async () => {
        const { error } = await client.from("ratings").insert(newRating);

        if (error) {
            console.error("Error creating new rating", error);
        } else {
            newRating.id = uuidV4();
            newRating.stars = null;
            emit("submitted");
        }
    };

    const update = async () => {
        const { error } = await client.from("ratings").update({ stars: newRating.stars }).match({
            userId: user.value!.id,
            serviceId: props.serviceId
        });

        if (error) {
            console.error("Error updating rating", error);
        } else {
            newRating.id = uuidV4();
            newRating.stars = null;
            emit("updated");
        }
    };

    const remove = async () => {
        if (confirm("Are you sure to delete this rating?")) {
            const { data, error } = await client.from("ratings").delete().match({ serviceId: props.serviceId, userId: user.value!.id });

            if (error) {
                console.error("Error updating rating", error);
            } else {
                console.log("Rating deleted", data);
                emit("deleted");
            }
        }
    };
</script>
