<template>
    <div>
        <NuxtLayout name = "main-pages">
            <div class = "font-[Roboto] text-center">
                <div class = "bg-[#0A5D00] rounded-b-3xl mx-auto w-screen pt-5 pb-10">
                    <img src ="/logo.png" class = "mx-auto w-[50px]" alt = "acre group logo" />
                    <h1 class = "font-bold text-3xl my-5 text-white drop-shadow-lg">Accommodations</h1>
                </div>
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup lang = 'ts'>

    interface AccsList {
        description? : string,
        imageLink? : string,
        location? : string,
        mapLink? : string,
        phoneNumber? : string,
        rating? : string,
        title? : string
    }

    const accsList = await useFetch<AccsList>("/api/accDetails/fetchAll");
</script>