<template>
    <div class="container mt-10">
        <template v-if="user">
            User is
            <pre class="max-h-[50vh] overflow-y-auto border-1 border-dark-800 mt-3">{{ user }}</pre>
        </template>

        <p v-else>
            Not logged in
        </p>
    </div>
</template>

<script lang="ts" setup>
    const user = useSupabaseUser();
</script>
