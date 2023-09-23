<template>
    <div>
        <NuxtLayout name = "main-pages">
            
        </NuxtLayout>
    </div>
</template>

<script setup lang = 'ts'>

    interface AccsResp {
        message? : string
        data? : Accs[]
    }

    interface Accs {
        description? : string,
        imageLink? : string,
        location? : string,
        mapLink? : string,
        phoneNumber? : string,
        rating? : string,
        title? : string
    }

    const accsList = await useFetch<AccsResp>("/api/accDetails/fetchAll");
</script>