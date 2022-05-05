<template>
    <div class="container flex flex-col space-y-4">
        <p class="font-bold">
            Add or update rating for {{ props.service.name }}:
        </p>

        <StarRating :key="myRating" :value="myRating" @selected="setStars" />

        <div class="flex space-x-4">
            <button v-if="exists" class="border-1 border-dark-800 inline" @click="remove()">
                delete
            </button>
        </div>
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

    const user = useSupabaseUser();
    const client = useSupabaseClient();
    const router = useRouter();

    const myRating = ref(props.service.ratings.find((review: Rating) => review.userId === user.value!.id)?.stars ?? 0);

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
        if (confirm("Are you sure to delete this rating?")) {
            const { data, error } = await client.from("ratings").delete().match({ serviceId: props.service.id, userId: user.value!.id });

            if (error) {
                console.error("Error updating rating", error);
            } else {
                console.log("Rating deleted", data);
                emit("deleted");
                router.push("/services");
            }
        }
    };
</script>
