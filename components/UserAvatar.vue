<template>
    <div>
        <img alt="User avatar" :src="props.src" :class="getAvatarSize(props.size)" referrerpolicy="no-referrer">
    </div>
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

    const getAvatarSize = (size: string): string => {
        if (size === "small")
            return "w-8 h-8 rounded-full";
        if (size === "medium")
            return "w-12 h-12 rounded-full";

        return "w-16 h-16 rounded-full";
    };
</script>
