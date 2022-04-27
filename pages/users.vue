<template>
    <div class="container space-y-10">
        <div>
            Users:

            <ul>
                <li v-for="user in users" :key="user.id">
                    <div class="flex">
                        <img :src="user.picture" :alt="user.name" class="w-14 h-14 rounded-full" referrerpolicy="no-referrer">
                        <p>{{ user.name }}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({
        middleware: ["auth"]
    });

    const client = useSupabaseClient();

    const { data: users } = await useAsyncData("users", async() => {
        const { data } = await client.from("users").select("id, name, picture");
        return data;
    });
</script>
