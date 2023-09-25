<template>
    <div v-if="userExists">
        <NuxtLayout name = "main-pages">
        <div class = "mx-auto text-center font-[Roboto] text-white">
            <div class = "bg-primary-green rounded-b-3xl mx-auto w-screen pt-5 pb-10">
                <img src ="/logo-alt.png" class = "mx-auto w-[15%]" alt = "acre group logo" />

                <h1 class="font-bold text-white text-2xl drop-shadow-lg drop-shadow-white my-3">Personal Profile</h1>
                <div class = "bg-white bg-gradient-to-b from-primary-gold via-light-gold to-primary-gold  py-2 my-3 circle-mask">
                    <img :src = "(userDetails.data.value?.data as UserDetails).DpUrl" class = "w-[40%] circle-mask mx-auto" alt = "member pfp"/>
                </div>
                <img src = "/PremiumIcon.png" class = "mx-auto my-5 w-[20%] absolute top-0 right-0 mt-[35%] mr-[28%] z-10">
                <div>
                    <p class = "text-xl md:text-5xl my-2"><span class = 'font-bold'>{{ (userDetails.data.value?.data as UserDetails)?.Name?.split(" ")[0] }}</span> <span>{{ (userDetails.data.value?.data as UserDetails)?.Name?.split(" ").slice(1).join(" ") }}</span></p>
                    <div>
                        <p class = "text-md">Membership Status: <span class = "font-bold">{{ (userDetails.data.value?.data as UserDetails)?.MembershipStatus }}</span></p>
                        <p class = "text-md">Valid from: <span class = "font-bold">{{ (userDetails.data.value?.data as UserDetails)?.validityStartDate }}</span></p>
                    </div>
                </div>
                
            </div>
        </div>

        <div class = "-my-5 mb-20 grid grid-cols-1 gap-10 text-[#3D3D3D]">
            <div>
                <DropCard cardTitle = "Personal Information">
                    <div class = "py-2">
                        <div class = "flex justify-between items-center my-1">
                            <p class = "text-md">Phone Number:</p>
                            <p>+91 {{ (userDetails.data.value?.data as UserDetails).Phone?.slice(0, 5) }} {{ (userDetails.data.value?.data as UserDetails).Phone?.slice(5) }}</p>
                        </div>
                        <div class = "flex justify-between items-center my-1">
                            <p class = "text-md">E-Mail Address: </p>
                            <p>{{ (userDetails.data.value?.data as UserDetails).Email }}</p>
                        </div>
                        <div class = "flex justify-between items-center my-1">
                            <p class = "text-md">Date Of Birth: </p>
                            <p>{{ (userDetails.data.value?.data as UserDetails).DOB }}</p>
                        </div>
                    </div>
                    
                    <hr class = "border-[#A3A1A1]" />
                    <div class = "flex justify-between items-center mt-2">
                        <h1 class = "font-bold text-md md:text-xl">Download Certicate </h1>
                        <a :href = "(userDetails.data.value?.data as UserDetails).certificateUrl" download = "certificate.pdf"><span class="material-symbols-outlined">download</span></a>
                    </div>
                </DropCard>
            </div>
            <div>
                <DropCard cardTitle = "ID Proof">
                    <img :src = "(userDetails.data.value?.data as UserDetails).proofUrl" class = "rounded-lg border-2 border-grey mx-auto" alt = "member aadhar" />
                </DropCard>
            </div>
        </div>
        </NuxtLayout>
    </div>

    <div v-else>
        <h1>User Does not exist</h1>
    </div>
</template>

<script setup lang="ts">

    const route = useRoute();
    const id = ref(route.params.id);

    const nuxtApp = useNuxtApp();
    if (!nuxtApp.$profileId) {
        nuxtApp.provide('profileId', id.value);
    }

    const userDetails = await useFetch<UserDetailsResponse>(`/api/userDetails/fetch?tagId=${(id.value.toString() as string).split("_")[0]}`)

    interface UserDetailsResponse {
        message : string,
        data : UserDetails
    }

    interface UserDetails {
        Email? : string,
        MembershipStatus? : string,
        Name? : string,
        NFCID? : string,
        Phone? : string,
        DpUrl? : string,
        validityStartDate? : string,
        proofUrl? : string,
        certificateUrl? : string,
        DOB? : string
    }

    const userExists = computed(() => {
        if (userDetails && userDetails.data && userDetails.data.value){
            return userDetails.data.value.message === "User Found"
        }
    })

</script>

<style scoped>
    * {
        box-sizing: border-box;
    }

    .circle-mask {
        mask-image: url("/Ellipse7.png");
        mask-repeat: no-repeat;
        mask-position: center center;
        mask-size: contain;
        mask-origin: border-box;
    }
</style>