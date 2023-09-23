<template>
    <NuxtLayout name = "main-pages">
        <div v-if="accFound" class = "font-[Roboto]">
            <!-- {{ (data.data.value?.data as AccDetails).description }} -->
            <div class = "font-[Roboto] text-center py-5 pb-20 rounded-b-xl bg-[#0A5D00] text-[#1E2968]">
                <img src = "/logo-whitebg.png" class = "mx-auto" alt = "logo"/>
                <h1 class = 'font-bold text-3xl text-white drop-shadow-lg my-2'>Accommodations</h1>
                <img :src = "(data.data.value?.data as AccDetails).topImageUrl1">

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
                    <p class = "mx-auto text-sm text-center w-[80%] my-5" v-html="formattedDesc2"></p>

                    <img :src="(data.data.value?.data?.imageUrl2)" class = "my-5 w-[90%] mx-auto rounded-lg whitespace-break-spaces" />
                    <p class = "mx-auto text-sm text-center w-[80%] my-5 " v-html="formattedDesc3"></p>
                </div>

                <div class = "mx-auto bg-[#0A5D00] text-center text-white p-5 w-[90%] rounded-lg">
                    <div>Call Us at <span class = "font-bold">+91 {{ (dataBrief.data.value?.data as Accs).phoneNumber?.slice(0, 5) }} {{ (dataBrief.data.value?.data as Accs).phoneNumber?.slice(5) }}</span></div>
                </div>

                <h1 class = "text-center font-bold mt-5 mb-2">Download The App: </h1>
                <div class = "flex justify-between w-[90%] gap-5 mx-auto">
                    <div class = "mx-auto bg-[#0A5D00] text-center text-white p-5 w-[50%] rounded-lg">
                        <NuxtLink to="/">
                            <span></span>
                        </NuxtLink>
                    </div>
                    <div class = "mx-auto bg-[#0A5D00] text-center text-white p-5 w-[50%] rounded-lg">
                        <NuxtLink to="/">
                            <span></span>
                        </NuxtLink>
                    </div>

                </div>
            
            </div>

        </div>
        <div v-else>
            <div class = "font-[Roboto] text-center">
                <img src = "/logo-whitebg.png" class = "mx-auto" alt = "logo"/>
                <h1>Accommodation Doesn't Exist</h1>
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

