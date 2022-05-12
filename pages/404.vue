<template>
    <NuxtLayout name="contained">
        <Head>
            <Title>404 - Not found</Title>
        </Head>
        <div class="relative p-8 text-center border border-gray-200 rounded-lg">
            <h1 class="text-5xl font-medium mb-5">
                404
            </h1>
            <h2 class="text-2xl font-medium">
                There's nothing here...
            </h2>

            <p class="mt-4 text-sm text-gray-500">
                You probably followd a broken link or the user doesn't exist anymore.
            </p>

            <NuxtLink
                to="/search"
                class="inline-flex items-center px-5 py-3 mt-8 font-medium text-white bg-orange-500 rounded-lg"
            >
                <div class="i-heroicons-outline-arrow-narrow-left flex-shrink-0 w-5 h-5 mr-3" />

                Go back
            </NuxtLink>
        </div>
    </NuxtLayout>
</template>
