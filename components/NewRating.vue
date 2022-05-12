<template>
    <div container class="flex flex-col space-y-4 mt-10">
        <p class="font-bold">
            Add or update rating for {{ props.service.name }}:
        </p>

        <div class="flex items-center space-x-4">
            <p>Your vote: {{ myRating }}</p>
            <StarRating :stars="myRating" @selected="setStars" />

            <button v-if="exists" class="btn-accent" @click="open = true">
                delete
            </button>
        </div>

        <Modal :open="open" @close="open = false">
            <h2 class="text-lg font-bold">
                Are you sure to delete this rating?
            </h2>

            <p class="mt-2 text-sm text-gray-500">
                You will have to rate again this user after you have deleted the rating
            </p>

            <div class="flex items-center justify-end mt-8 text-xs">
                <button type="button" class="px-4 py-2 font-medium text-green-600 rounded bg-green-50" @click="remove(); open = false;">
                    OK
                </button>
                <button type="button" class="px-4 py-2 ml-2 font-medium text-gray-600 rounded bg-gray-50" @click="open = false">
                    Cancel
                </button>
            </div>
        </Modal>
    </div>
</template>

<script lang="ts" setup>
    import { v4 as uuidV4 } from "uuid";
    const props = defineProps({
        service: {
            type: Object,
            required: true
        },
        exists: {
            type: Boolean,
            required: true
        }
    });

    const emit = defineEmits(["submitted", "updated", "deleted"]);

    const open = ref(false);
    const user = useSupabaseUser();
    const client = useSupabaseClient();

    const myRating = ref<string>(props.service.ratings.find((review: Rating) => review.userId === user.value!.id)?.stars.toString() ?? "0.0");

    const newRating = reactive<Rating>({
        id: uuidV4(),
        userId: user.value!.id,
        serviceId: props.service.id,
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
            serviceId: props.service.id
        });

        if (error) {
            console.error("Error updating rating", error);
        } else {
            newRating.id = uuidV4();
            newRating.stars = null;
            emit("updated");
        }
    };

    const setStars = (stars: number) => {
        newRating.stars = stars;

        props.exists ? update() : post();
    };

    const remove = async () => {
        const { data, error } = await client.from("ratings").delete().match({ serviceId: props.service.id, userId: user.value!.id });

        if (error) {
            console.error(error.message);
        } else {
            console.log("Rating deleted", data);
            emit("deleted");
        }
    };
</script>
