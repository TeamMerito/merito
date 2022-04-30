<template>
    <img alt="User avatar" :src="props.src">
</template>

<script lang="ts" setup>
    const props = defineProps({
        size: {
            type: String,
            required: true,
            validator: (value: string) => ["small", "medium", "large"].includes(value)
        },
        src: {
            type: String,
            required: true
        }
    });
</script>

<style scoped>
    img {
        width: 100px;
        height: 100px;

        border-radius: 50%;
    }
</style>
