<template>
    <div class="star-rating flex">
        <label v-for="star in maxStars" :key="`star-${star}`" class="p-2" :class="props.static ? 'cursor-default' : 'cursor-pointer'" @click.once="select(star)" @mouseover="starOver(star)" @mouseout="starOut()">
            <input v-model="val" class="hidden" type="radio" :value="star" :disabled="props.static">
            <div class="i-fa-solid-star w-5 h-5 transition-colors" :class="val >= star ? 'text-yellow-300' : 'text-gray-400'" />
        </label>
    </div>
</template>

<script lang="ts" setup>
    const props = defineProps({
        stars: {
            type: Number,
            required: false,
            default: 0
        },
        static: {
            type: Boolean,
            required: false,
            default: false
        }
    });

    const emit = defineEmits(["selected"]);
    const maxStars = 5;

    const val = ref(props.stars);
    let oldVal = props.stars;

    const starOver = (index: number) => {
        if (!props.static) {
            val.value = index;
        }
    };

    const starOut = () => {
        if (!props.static) {
            val.value = oldVal;
        }
    };

    const select = (star: number) => {
        if (!props.static) {
            val.value = oldVal = star;
            emit("selected", star);
        }
    };
</script>
