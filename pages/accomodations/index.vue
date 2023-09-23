<template>
    <div>
        <NuxtLayout name = "main-pages">
            <img src = "/logo-default.png" class = "scale-110 my-2 mx-auto" alt = "logo"/>
            <h1 class = "text-[#1E2968] font-bold text-center font-[Roboto] text-3xl my-5">Accommodations</h1>
            <div v-for = "acc in (accsList.data.value?.data as Accs[])">
                <ImageCard 
                    :description="acc.description"
                    :title="acc.title"
                    :location="acc.location"
                    :image-link="acc.imageLink"
                    :mapLink="acc.mapLink"
                />
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