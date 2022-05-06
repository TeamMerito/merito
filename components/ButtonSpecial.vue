<template>
    <div class="relative inline-block px-8 py-3 text-white bg-orange-500 rounded-full group">
        <span class="text-sm font-medium transition-opacity group-hover:opacity-0">
            <slot name="front" />
        </span>

        <div class="absolute inset-0 flex items-center justify-center space-x-4 transition-opacity opacity-0 group-hover:opacity-100">
            <slot name="back" />
        </div>
    </div>
</template>
