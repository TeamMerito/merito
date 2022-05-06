<template>
    <footer class="bg-gray-50">
        <div container class="py-8 mx-auto">
            <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div>
                    <div class="flex space-x-3 items-center">
                        <Logo class="text-orange-500 w-12 h-12" />
                        <p class="font-medium">
                            Merito
                        </p>
                    </div>

                    <p class="max-w-xs mt-4 text-sm text-gray-500">
                        Rate people and services
                    </p>

                    <div class="flex mt-8 space-x-2 text-gray-500">
                        <NuxtLink to="https://www.facebook.com" class="hover:opacity-75" target="_blank">
                            <span class="sr-only"> Facebook </span>

                            <div class="i-fa-brands-facebook w-6 h-6" />
                        </NuxtLink>

                        <NuxtLink to="https://www.instagram.com" class="hover:opacity-75" target="_blank">
                            <span class="sr-only"> Instagram </span>

                            <div class="i-fa-brands-instagram w-6 h-6" />
                        </NuxtLink>
                    </div>
                </div>

                <div class="grid grid-cols-1 gap-8 lg:col-span-2 sm:grid-cols-2 lg:grid-cols-4">
                    <div />
                    <div />

                    <div>
                        <p class="font-medium">
                            Helpful Links
                        </p>

                        <nav class="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
                            <NuxtLink to="/contacts" class="hover:opacity-75">
                                Contacts
                            </NuxtLink>
                            <NuxtLink to="/faqs" class="hover:opacity-75">
                                FAQs
                            </NuxtLink>
                        </nav>
                    </div>

                    <div>
                        <p class="font-medium">
                            Legal
                        </p>

                        <nav class="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
                            <NuxtLink to="/privacy" class="hover:opacity-75">
                                Privacy Policy
                            </NuxtLink>
                            <NuxtLink to="/terms" class="hover:opacity-75">
                                Terms and conditions
                            </NuxtLink>
                        </nav>
                    </div>
                </div>
            </div>

            <p class="mt-8 text-xs text-gray-500">
                &copy; {{ currentYear }} Merito Team
            </p>
        </div>
    </footer>
</template>

<script lang="ts" setup>
    const currentYear = new Date().getFullYear();
</script>
