<template>
    <nav class="font-heading shadow-md">
        <div class="container py-5">
            <div class="relative flex lg:grid items-center grid-cols-2 lg:grid-cols-3 justify-between">
                <div class="items-center hidden space-x-8 lg:flex">
                    <NuxtLink to="/services" class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400">
                        Services
                    </NuxtLink>
                    <NuxtLink to="/ratings" class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400">
                        Ratings
                    </NuxtLink>
                    <NuxtLink to="/search" class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400">
                        Search
                    </NuxtLink>
                    <NuxtLink to="/admin" class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400">
                        Admin
                    </NuxtLink>
                </div>
                <NuxtLink to="/" class="inline-flex items-center lg:mx-auto">
                    <logo class="w-10 text-accent" />
                </NuxtLink>

                <div v-if="user" class="items-center justify-end hidden space-x-8 lg:flex">
                    <NuxtLink to="/profile" class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400">
                        Profile
                    </NuxtLink>
                    <button class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400" @click="logout">
                        Logout
                    </button>
                </div>
                <div v-else class="items-center hidden ml-auto space-x-8 lg:flex">
                    <Login />
                </div>

                <button class="lg:hidden p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50" @click="open = true">
                    <div class="i-fa-solid-bars text-dark-600" />
                </button>
            </div>

            <div v-if="open" class="ml-auto lg:hidden">
                <div class="absolute top-0 left-0 w-full">
                    <div class="p-5 bg-white border rounded shadow-sm">
                        <div class="flex items-center justify-between mb-4">
                            <div>
                                <NuxtLink to="/" class="inline-flex items-center">
                                    <logo class="w-10 text-accent" />
                                </NuxtLink>
                            </div>
                            <div>
                                <button class="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" @click="open = false">
                                    <div class="i-fa-solid-x w-5 text-gray-600" />
                                </button>
                            </div>
                        </div>
                        <nav>
                            <ul class="space-y-4">
                                <li><a href="/" aria-label="Our product" title="Our product" class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400">Product</a></li>
                                <li><a href="/" aria-label="Our product" title="Our product" class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400">Features</a></li>
                                <li><a href="/" aria-label="Product pricing" title="Product pricing" class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400">Pricing</a></li>
                                <li class="text-center">
                                    <Login />
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script lang="ts" setup>
    const open = ref(false);
    const router = useRouter();
    const user = useSupabaseUser();
    const { auth } = useSupabaseClient();

    const logout = async () => {
        await auth.signOut();
        router.push("/");
    };
</script>
