<template>
    <div>
        <NuxtLayout name = "main-pages">
            <div class = "font-[Roboto] text-center">
                <div class = "bg-[#0A5D00] rounded-b-3xl mx-auto w-screen pt-5 pb-10">
                    <img src ="/logo.png" class = "mx-auto w-[50px]" alt = "acre group logo" />
                    <h1 class = "font-bold text-3xl my-5 text-white drop-shadow-lg">Accommodations</h1>

                    <img :src = "(accsList.data.value?.data as Accs[])[1].imageLink" class = "mx-auto border-1 border-grey">
                    <h1 class = "text-white my-4 font-bold text-xl">{{ (accsList.data.value?.data as Accs[])[1].title }}</h1>
                    <NuxtLink :to="(accsList.data.value?.data as Accs[])[1].mapLink"><p class = "flex items-center justify-center text-white"><span class="material-symbols-outlined">location_on</span>{{ (accsList.data.value?.data as Accs[])[1].location }}</p></NuxtLink>
                </div>
            </div>

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