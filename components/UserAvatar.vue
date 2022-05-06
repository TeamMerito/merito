<template>
    <div>
        <img :alt="user.user_metadata.name" :src="props.src" class="rounded-full object-cover" :class="getAvatarSize(props.size)" referrerpolicy="no-referrer">
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
    const user = useSupabaseUser();

    const getAvatarSize = (size: string): string => {
        if (size === "small")
            return "w-8 h-8";
        if (size === "medium")
            return "w-12 h-12";

        return "w-16 h-16";
    };
</script>
