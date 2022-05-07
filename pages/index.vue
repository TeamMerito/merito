<template>
    <aside class="p-12 sm:p-16 lg:p-24">
        <div class="max-w-3xl mx-auto text-center">
            <div class="flex space-x-4 max-w-2/5 justify-center items-end mx-auto" :style="parallax">
                <div class="i-fa-solid-star w-7 h-7 text-yellow-300" />
                <div class="i-fa-solid-star w-25 h-15 text-orange-300 animate-pulse" />
                <div class="i-fa-solid-star w-7 h-7 text-yellow-300" />
            </div>
            <p class="text-3xl font-bold sm:text-5xl mt-10 font-heading">
                Merito
            </p>

            <p class="text-sm font-medium text-gray-500 mt-5">
                Rate people and services
            </p>

            <div class="sm:items-center sm:justify-center sm:flex space-x-4 mt-10 lg:mt-20">
                <button class="block px-5 py-3 font-medium text-white bg-orange-500 rounded-lg shadow-xl hover:bg-orange-600" @click="login('google')">
                    Get started
                </button>

                <NuxtLink to="/faqs" class="block px-5 py-3 mt-4 font-medium text-orange-500 rounded-lg hover:text-orange-600 sm:mt-0">
                    How it works
                </NuxtLink>
            </div>
        </div>
    </aside>
</template>

<script lang="ts" setup>
    const runtimeConfig = useRuntimeConfig();
    const { auth } = useSupabaseClient();
    const router = useRouter();
    const { x, y } = useMouse({ touch: false });

    const parallax = computed(() => ({
        transform: `translateX(${x.value / 90}px) translateY(-${y.value / 90}px)`
    }));

    const login = async (provider: "google" | "github") => {
        try {
            const { error } = await auth.signIn({
                provider
            }, {
                redirectTo: runtimeConfig.public.redirectUrl
            });

            if (error) {
                throwError(error.toString());
            } else {
                nextTick(() => router.push("/profile"));
            }
        } catch (e) {
            console.error("Something went wrong during login:", e);
        }
    };
</script>
