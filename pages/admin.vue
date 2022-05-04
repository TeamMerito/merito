<template>
    <div class="container">
        <p>Super secret admin page</p>
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({
        middleware: ["admin"]
    });
</script>
