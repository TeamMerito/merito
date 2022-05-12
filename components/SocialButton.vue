<template>
    <button class="inline-block p-3 transition-colors text-orange-500 border border-orange-500 rounded-full hover:(text-white bg-orange-500) active:bg-orange-500 focus:(outline-none ring)" @click="emit('clicked')">
        <span class="sr-only">
            <slot />
        </span>

        <div :class="props.icon" class="w-5 h-5" />
    </button>
</template>

<script lang="ts" setup>
    const props = defineProps({
        icon: {
            type: String,
            required: true
        }
    });

    const emit = defineEmits(["clicked"]);
</script>
