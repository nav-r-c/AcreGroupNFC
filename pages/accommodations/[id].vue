<template>
    <NuxtLayout name = "main-pages">
        <div v-if="accFound" class = "font-[Roboto]">
            <div>
                <div class = "font-[Roboto] text-center py-5 pb-20 rounded-b-xl bg-primary-green text-[#1E2968]">
                    <img src = "/logo-alt.png" class = "mx-auto w-[15%]" alt = "logo" loading="lazy"/>
                    <h1 class = 'font-bold text-2xl text-white drop-shadow-lg my-2'>Accommodations</h1>

                    <Carousel :images = "images"/>

                    <div class = "my-2">
                        <h1 class = "text-white text-lg font-bold">{{ id.split('+').join(' ').trim() }}</h1>
                        <NuxtLink :to="(dataBrief.data.value?.data as Accs).mapLink"><p class = "text-white text-[0.75rem] w-[80%] mx-auto my-1 flex justify-center items-center"><span class="material-symbols-outlined text-white text-sm">location_on</span>{{ (data.data.value?.data as AccDetails).location }}</p></NuxtLink>
                        <!-- <p class = "text-white text-[0.75rem] w-[80%] mx-auto my-1 flex justify-center items-center"><span class="material-symbols-outlined text-white text-sm">location_on</span>{{ (data.data.value?.data as AccDetails).location }}</p></NuxtLink> -->
                    </div>
                </div>

                <div class = '-my-[15%]'>
                    <p class = "text-center mx-auto text-sm w-[90%] bg-white rounded-md p-5 border-2 border-[#fefefe] shadow-lg whitespace-break-spaces" v-html="formattedDesc"></p>

                    <div class = "my-10">
                        <img :src="(data.data.value?.data?.imageUrl1)" class = "my-5 w-[90%] mx-auto rounded-lg whitespace-break-spaces" />
                        <p class = "mx-auto text-sm text-center w-[80%] my-5" v-html="formattedDesc2" loading="lazy"></p>

                        <img :src="(data.data.value?.data?.imageUrl2)" class = "my-5 w-[90%] mx-auto rounded-lg whitespace-break-spaces" />
                        <p class = "mx-auto text-sm text-center w-[80%] my-5 " v-html="formattedDesc3" loading = "lazy"></p>
                    </div>

                    <div class = "mx-auto bg-primary-green text-center text-white p-5 w-[90%] rounded-lg">
                        <a :href = "`tel:${(dataBrief.data.value?.data as Accs).phoneNumber}`"><div>Get Support: <span class = "font-bold">+91 {{ (dataBrief.data.value?.data as Accs).phoneNumber?.toString().slice(0, 5) }} {{ (dataBrief.data.value?.data as Accs).phoneNumber?.toString().slice(5) }}</span></div></a>
                    </div>

                    <h1 class = "text-center font-bold mt-5 mb-2">Book Your Stay: </h1>
                    <div class = "flex justify-between w-[90%] gap-5 mx-auto">
                        <div class = "mx-auto bg-primary-green text-center text-white p-5 w-[50%] rounded-lg">
                            <NuxtLink to="/accommodations">
                                <img src = "/GooglePlay.png" class = "mx-auto" loading="lazy"/>
                            </NuxtLink>
                        </div>
                        <div class = "mx-auto bg-primary-green text-center text-white p-5 w-[50%] rounded-lg">
                            <NuxtLink to="/accommodations">
                                <img src = "/AppStore.png" class = "mx-auto" loading="lazy" />
                            </NuxtLink>
                        </div>

                    </div>
                
                </div>
            </div>
            

        </div>

        <div v-else>
            <div class = "font-[Roboto] text-center bg-primary-green text-white p-20 rounded-b-3xl">
                <img src = "/logo-whitebg.png" class = "mx-auto" alt = "logo" loading="lazy"/>
                <h1 class = "text-xl font-bold my-5">Information On This Accommodation is Unavailable</h1>
                <NuxtLink to="/accommodations" class = "underline">Go Back To List</NuxtLink>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
    const route = useRoute();
    const id = route.params.id.toString() as string

    interface AccsResp {
        message? : string
        data? : AccDetails
    }

    interface AccDetails {
        description? : string,
        description2? : string,
        description3? : string,
        imageUrl1? : string,
        imageUrl2? : string,
        imageUrl3? : string,
        location? : string,
        topImageUrl1? : string
        topImageUrl2? : string
        topImageUrl3? : string
        topImageUrl4? : string
    }

    interface AccsBriefResp {
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


    const data = await useFetch<AccsResp>(`/api/accDetails/fetchDetails?accName=${id}`)
    const dataBrief = await useFetch<AccsBriefResp>(`/api/accDetails/fetch?accName=${id}`)

    const images = [
        (data.data.value?.data as AccDetails).topImageUrl1,
        (data.data.value?.data as AccDetails).topImageUrl2,
        (data.data.value?.data as AccDetails).topImageUrl3,
        (data.data.value?.data as AccDetails).topImageUrl4,
    ]

    const accFound = computed(() => data.data.value?.message === "Accommodation Found" && dataBrief.data.value?.message === "Accommodation Found")

    const formattedDesc = computed(() => {
        const description = data.data.value?.data?.description?.toString() || '';
        const lines = description.split('\\n').filter(Boolean);
        return lines.join('<br><br>');
    });

    const formattedDesc2 = computed(() => {
        const description = data.data.value?.data?.description2?.toString() || '';
        const lines = description.split('\\n').filter(Boolean);
        return lines.join('<br><br>');
    });

    const formattedDesc3 = computed(() => {
        const description = data.data.value?.data?.description3?.toString() || '';
        const lines = description.split('\\n').filter(Boolean);
        return lines.join('<br><br>');
    });




</script>

