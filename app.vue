<template>
    <div class="flex flex-col min-h-screen overflow-x-hidden">
        <StructureNavbar />
        <div class="flex-1">
            <NuxtPage />
        </div>
        <StructureFooter />
    </div>
</template>

<style>
    [container], .container{
        @apply mx-auto px-4;
    }
</style>
