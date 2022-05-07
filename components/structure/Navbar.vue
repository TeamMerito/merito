<template>
    <nav id="navbar">
        <div container class="flex items-center justify-between py-4">
            <NuxtLink to="/" class="inline-flex items-center justify-center">
                <Logo class="text-orange-500 w-10" />
            </NuxtLink>

            <ul class="flex items-center space-x-2 text-sm font-medium text-gray-500">
                <li>
                    <NuxtLink to="/search" class="px-3 py-2 rounded-lg">
                        Search
                    </NuxtLink>
                </li>

                <li>
                    <ButtonSpecial>
                        <template #front>
                            {{ user ? user.user_metadata.name : "Login" }}
                        </template>
                        <template #back>
                            <template v-if="user">
                                <NuxtLink to="/profile" class="block transition-opacity rounded-full hover:opacity-90 focus:(outline-none opacity-75)">
                                    <div class="i-heroicons-outline-user w-5 h-5" />
                                </NuxtLink>
                                <button class="block transition-opacity rounded-full hover:opacity-90 focus:(outline-none opacity-75)" @click="logout()">
                                    <div class="i-heroicons-outline-x w-5 h-5" />
                                </button>
                            </template>
                            <button v-else class="block transition-opacity rounded-full hover:opacity-90 focus:(outline-none opacity-75)" @click="login('google')">
                                <div class="i-fa-brands-google w-5 h-5" />
                            </button>
                        </template>
                    </ButtonSpecial>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script lang="ts" setup>
    const runtimeConfig = useRuntimeConfig();
    const router = useRouter();
    const user = useSupabaseUser();
    const { auth } = useSupabaseClient();

    const login = async (provider: "google" | "github") => {
        try {
            const { error } = await auth.signIn({
                provider
            }, {
                redirectTo: runtimeConfig.public.redirectUrl
            });

            if (error) {
                throwError(error.toString());
            }
        } catch (e) {
            console.error("Something went wrong during login:", e);
        }
    };

    const logout = async () => {
        await auth.signOut();
        router.push("/");
    };
</script>
