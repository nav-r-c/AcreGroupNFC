<template>
    <div>
        <NuxtLayout name = "main-pages">
            <div class = "bg-[#0A5D00] py-5 rounded-b-xl">
                <img src = "/logo-whitebg.png" class = "mx-auto" alt = "logo"/>
                <h1 class = "text-white drop-shadow-lg font-bold text-center font-[Roboto] text-3xl mb-10">Accommodations</h1> 
            </div>

            <div class = "-my-[15%]">
                <div v-for = "acc in (accsList.data.value?.data as Accs[])">
                    <ImageCard 
                        :description="acc.description"
                        :title="acc.title"
                        :location="acc.location"
                        :image-link="acc.imageLink"
                        :mapLink="acc.mapLink"
                    />
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