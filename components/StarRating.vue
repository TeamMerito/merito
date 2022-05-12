<template>
    <div class="star-rating flex">
        <label v-for="star in maxStars" :key="`star-${star}`" class="p-2" :class="props.static ? 'cursor-default' : 'cursor-pointer'" @click.once="select(star)" @mouseover="starOver(star)" @mouseout="starOut()">
            <input v-model="val" class="hidden" type="radio" :value="star" :disabled="props.static">
            <div class="w-5 h-5 transition-colors" :class="getStar(val, star)" />
        </label>
    </div>
</template>

<script lang="ts" setup>
    const props = defineProps({
        stars: {
            type: String,
            required: false,
            default: "0.0"
        },
        static: {
            type: Boolean,
            required: false,
            default: false
        }
    });

    const emit = defineEmits(["selected"]);
    const maxStars = 5;

    const val = ref(Number(props.stars));
    let oldVal = Number(props.stars);

    const getStar = (value: number, currentStar: number): string => {
        if (Number.isInteger(value)) {
            return value >= currentStar ? "i-fa-solid-star text-yellow-400" : "i-fa-solid-star text-gray-400";
        } else {
            if (Math.ceil(value) === currentStar) {
                return "i-fa-solid-star-half text-yellow-400";
            }
            if (value >= currentStar) {
                return "i-fa-solid-star text-yellow-400";
            }
            return "i-fa-solid-star text-gray-400";
        }
    };

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
