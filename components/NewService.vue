<template>
    <div class="flex flex-col space-y-4">
        <p class="font-bold">
            Add new service:
        </p>
        <select v-model="newService.type" class="border-1 border-dark-800">
            <option v-for="opt in availableServices" :key="opt">
                {{ opt }}
            </option>
        </select>
        <input v-model="newService.name" type="text" class="border-1 border-dark-800" placeholder="name">
        <input v-model="newService.description" type="text" class="border-1 border-dark-800" placeholder="desc">

        <button class="border-1 border-dark-800 inline" :disabled="newService.name == '' || newService.desc == ''" @click="upload()">
            upload
        </button>
    </div>
</template>

<script lang="ts" setup>
    import { v4 as uuidV4 } from "uuid";

    const client = useSupabaseClient();

    const availableServices = ["Person", "Place", "Resource", "Movie"];

    const newService = reactive<Service>({
        id: uuidV4(),
        type: availableServices[0],
        description: "",
        name: ""
    });

    const upload = async() => {
        const { data, error } = await client.from("services").insert([newService]);

        if (error) {
            console.error("Error creating new service", error);
        } else {
            console.log(data);
            newService.id = uuidV4();
            newService.type = availableServices[0];
            newService.name = "";
            newService.description = "";
        }
    };
</script>
