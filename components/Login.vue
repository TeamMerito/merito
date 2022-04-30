<template>
    <button
        class="btn text-white bg-accent"
        @click="login('google')"
    >
        Login
    </button>
</template>

<script lang="ts" setup>
    const { auth } = useSupabaseClient();

    const login = async(provider: "google" | "github") => {
        try {
            const { error } = await auth.signIn({
                provider
            }, {
                redirectTo: `${window.location.origin}`
            });

            if (error) {
                throw error;
            }
        } catch (e) {
            console.error("Something went wrong during login:", e);
        }
    };
</script>
