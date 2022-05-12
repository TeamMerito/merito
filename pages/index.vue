<template>
    <NuxtLayout name="default">
        <Head>
            <Title>Home</Title>
        </Head>

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

                <div class="sm:(flex items-center justify-center) mt-10 space-y-4 lg:(space-x-4 space-y-0 mt-20)">
                    <NuxtLink to="/login" class="btn-accent w-full lg:w-auto">
                        Get started
                    </NuxtLink>

                    <NuxtLink to="/faqs" class="w-full lg:w-auto block px-5 py-3 font-medium text-orange-500 rounded-lg hover:text-orange-600 sm:mt-0">
                        How it works
                    </NuxtLink>
                </div>
            </div>
        </aside>
    </NuxtLayout>
</template>

<script lang="ts" setup>
    const { x, y } = useMouse({ touch: false });

    const parallax = computed(() => ({
        transform: `translateX(${x.value / 90}px) translateY(-${y.value / 90}px)`
    }));
</script>
