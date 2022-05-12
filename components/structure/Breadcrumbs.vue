<template>
    <ol role="list" class="flex items-center space-x-1 text-sm text-gray-500 mb-10">
        <li>
            <NuxtLink to="/" class="block transition-colors hover:(text-gray-700 underline)">
                Home
            </NuxtLink>
        </li>

        <li>
            <div class="i-heroicons-outline-chevron-right w-3 h-3" />
        </li>

        <li>
            <p class="block transition-colors capitalize hover:text-gray-700">
                {{ $route.name }}
            </p>
        </li>
    </ol>
</template>
