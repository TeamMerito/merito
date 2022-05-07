<template>
    <template v-if="props.el === 'button'">
        <button type="button" class="inline-block px-12 py-3 text-sm font-medium rounded focus:(outline-none ring)">
            <slot />
        </button>
    </template>
    <template v-else>
        <NuxtLink :to="props.to" class="inline-block px-12 py-3 text-sm font-medium rounded focus:(outline-none ring)">
            <slot />
        </NuxtLink>
    </template>
</template>

<script lang="ts" setup>
    const props = defineProps({
        el: {
            type: String,
            default: "button",
            required: true
        },
        to: {
            type: String,
            default: "/"
        }
    });
</script>
