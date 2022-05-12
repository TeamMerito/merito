<template>
    <ClientOnly>
        <div v-show="props.visible" class="flex items-center justify-between p-4 border rounded" :class="typeClass" role="alert">
            <p class="text-sm font-medium">
                <slot />
            </p>

            <button class="opacity-90" type="button" @click="emit('dismiss')">
                <span class="sr-only">Close</span>
                <div class="i-heroicons-outline-x w-4 h-4" />
            </button>
        </div>
    </ClientOnly>
</template>

<script lang="ts" setup>
    const props = defineProps({
        type: {
            type: String,
            default: "info"
        },
        visible: {
            type: Boolean,
            default: false
        }
    });

    const emit = defineEmits(["dismiss"]);

    const typeClass = ref("");

    if (props.type === "info") {
        typeClass.value = "text-sky-700 bg-sky-50 border-sky-900/10";
    }
    if (props.type === "warning") {
        typeClass.value = "text-amber-700 bg-amber-50 border-amber-900/10";
    }
    if (props.type === "success") {
        typeClass.value = "text-green-700 bg-green-50 border-green-900/10";
    }
    if (props.type === "danger") {
        typeClass.value = "text-red-700 bg-red-50 border-red-900/10";
    }
</script>
