<template>
    <nav id="navbar">
        <div container class="flex items-center justify-between py-4">
            <NuxtLink to="/" class="inline-flex items-center justify-center">
                <Logo class="text-orange-500 w-10" />
            </NuxtLink>

            <div class="flex items-center space-x-2 text-sm font-medium text-gray-500">
                <NuxtLink to="/search" class="px-3 py-2 rounded-lg">
                    Search
                </NuxtLink>

                <NuxtLink :to="user ? '/profile' : '/login'" class="btn-accent btn-pill">
                    {{ user ? "Profile" : "Login" }}
                </NuxtLink>
            </div>
        </div>
    </nav>
</template>

<script lang="ts" setup>
    const user = useSupabaseUser();
</script>
