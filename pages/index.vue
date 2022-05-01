<template>
    <div class="container mt-10">
        <div v-if="user">
            <p>User is</p>
            <textarea v-model="prettyUser" class="border-1 border-dark-800 w-full" rows="10" />
        </div>

        <p v-else>
            Not logged in
        </p>
    </div>
</template>

<script lang="ts" setup>
    const user = useSupabaseUser();
    const prettyUser = usePrettify(user.value);
</script>
