<template>
    <ClientOnly>
        <teleport to="body">
            <div v-show="props.open" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <Transition enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                    <div v-show="props.open" class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition>

                <div class="fixed z-10 inset-0 overflow-y-auto">
                    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <Transition enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                            <div v-show="props.open" ref="el" class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div class="p-8">
                                    <h2 class="text-lg font-bold">
                                        Delete all history?
                                    </h2>

                                    <p class="mt-2 text-sm text-gray-500">
                                        The action cannot be undone.
                                    </p>

                                    <div class="flex items-center justify-end mt-8 text-xs">
                                        <button type="button" @click="emit('confirm'); emit('close')" class="px-4 py-2 font-medium text-orange-600 rounded bg-orange-50">
                                            Yes, I'm sure
                                        </button>
                                        <button type="button" @click="emit('close')" class="px-4 py-2 ml-2 font-medium text-gray-600 rounded bg-gray-50">
                                            No, go back
                                        </button>
                                    </div>
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

    const emit = defineEmits(["close", "confirm"]);

    const el = ref(null);

    onClickOutside(el, () => emit("close"));
</script>
