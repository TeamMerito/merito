<template>
    <NuxtLayout name="contained">
        <Head>
            <Title>FAQs</Title>
        </Head>

        <StructureBreadcrumbs />

        <div class="space-y-4">
            <div v-for="(question, index) in questions" :key="index">
                <details class="p-6 rounded-lg bg-gray-50 group">
                    <summary class="flex items-center justify-between cursor-pointer">
                        <h5 class="font-medium text-gray-900">
                            {{ question.title }}
                        </h5>

                        <span class="relative flex-shrink-0 ml-1.5 w-5 h-5">
                            <div class="i-heroicons-outline-plus-circle absolute inset-0 w-5 h-5 opacity-100 group-open:opacity-0" />
                            <div class="i-heroicons-outline-minus-circle absolute inset-0 w-5 h-5 opacity-100 group-open:opacity-100" />
                        </span>
                    </summary>

                    <p class="mt-4 leading-relaxed text-gray-700">
                        {{ question.content }}
                    </p>
                </details>
            </div>
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
    const questions = [
        {
            title: "Lorem ipsum dolor sit amet consectetur adipisicing?",
            content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis molestias culpa in, recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo consequuntur distinctio corporis earum similique!"
        },
        {
            title: "Lorem ipsum dolor sit amet consectetur adipisicing 2?",
            content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis molestias culpa in, recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo consequuntur distinctio corporis earum similique 2!"
        },
        {
            title: "Lorem ipsum dolor sit amet consectetur adipisicing 3?",
            content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis molestias culpa in, recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo consequuntur distinctio corporis earum similique 3!"
        }
    ];
</script>
