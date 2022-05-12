<template>
    <ClientOnly>
        <teleport to="body">
            <div v-show="props.open" class="relative z-10" role="dialog">
                <Transition enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                    <div v-show="props.open" class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition>

                <div class="fixed z-10 inset-0 overflow-y-auto">
                    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                        <Transition enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                            <div v-show="props.open" ref="el" class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div class="p-8">
                                    <slot />
                                </div>
                            </div>
                        </Transition>
                    </div>
                </div>
            </div>
        </teleport>
    </ClientOnly>
</template>

<script lang="ts" setup>
    const props = defineProps({
        open: {
            type: Boolean,
            default: false
        }
    });

    const emit = defineEmits(["close"]);
    const el = ref(null);

    onClickOutside(el, () => emit("close"));
</script>
