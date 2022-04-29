<template>
    <div>
        <div class="bg-dark-800 py-2">
            <div class="container flex items-center justify-between space-x-4 ">
                <div class="flex items-center space-x-4">
                    <NuxtLink to="/" class="text-white underline">
                        <logo class="text-accent h-10" />
                    </NuxtLink>
                    <NuxtLink to="/services" class="text-white underline">
                        Services
                    </NuxtLink>
                    <NuxtLink to="/ratings" class="text-white underline">
                        Ratings
                    </NuxtLink>
                </div>

                <div v-if="user" class="space-x-4">
                    <NuxtLink to="/profile" class="text-white underline">
                        Profile
                    </NuxtLink>
                    <button class="text-white" @click="logout">
                        Logout
                    </button>
                </div>
                <div v-else class="space-x-4">
                    <button class="text-white" @click="login('google')">
                        Login with Google
                    </button>
                <!-- <button class="text-white" @click="login('github')">
                    Login with GitHub
                </button> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const user = useSupabaseUser();
    const { auth } = useSupabaseClient();

    const login = async(provider: "google" | "github") => {
        try {
            const { error } = await auth.signIn({ provider });

            if (error) {
                throw error;
            }
        } catch (e) {
            console.error("Something went wrong during login:", e);
        }
    };

    const logout = async() => {
        await auth.signOut();
    };
</script>
