<template>
    <div v-if="userExists">
        <NuxtLayout name = "main-pages">
        <div class = "mx-auto text-center font-[Roboto] text-white">
            <div class = "bg-[#0A5D00] rounded-b-3xl mx-auto w-screen pt-5 pb-10">
                <img src ="/logo.png" class = "mx-auto w-[50px]" alt = "acre group logo" />

                <h1 class="font-bold text-white text-3xl md:text-4xl drop-shadow-lg drop-shadow-white my-5">Personal Profile</h1>
                <div class = "bg-[#1E2968] py-4 my-5 circle-mask">
                    <img :src = "(userDetails.data.value?.data as UserDetails).image" class = "w-[80%] circle-mask mx-auto" alt = "member pfp"/>
                </div>
                <img src = "/PremiumIcon.png" class = "mx-auto my-5 absolute top-0 right-0 mt-[35%] mr-[20%] z-10">
                <div>
                    <p class = "text-2xl md:text-5xl"><span class = 'font-bold'>{{ (userDetails.data.value?.data as UserDetails)?.name?.split(" ")[0] }}</span> <span>{{ (userDetails.data.value?.data as UserDetails)?.name?.split(" ").slice(1).join(" ") }}</span></p>
                    <div>
                        <p class = "text-lg md:text-2xl">Membership Status: <span class = "font-bold">{{ (userDetails.data.value?.data as UserDetails)?.membershipStatus }}</span></p>
                        <p class = "text-lg md:text-2xl">Valid from: <span class = "font-bold">{{ (userDetails.data.value?.data as UserDetails)?.validDate }}</span></p>
                    </div>
                </div>
                
            </div>
        </div>

        <div class = "-my-5 mb-20 grid grid-cols-1 gap-10">
            <div>
                <DropCard cardTitle = "Personal Information">
                    <div class = "py-2">
                        <div class = "flex justify-between items-center my-1">
                            <p>Phone Number:</p>
                            <p>+91 {{ (userDetails.data.value?.data as UserDetails).phoneNumber?.slice(0, 5) }} {{ (userDetails.data.value?.data as UserDetails).phoneNumber?.slice(5) }}</p>
                        </div>
                        <div class = "flex justify-between items-center my-1">
                            <p>E-Mail Address: </p>
                            <p>{{ (userDetails.data.value?.data as UserDetails).email }}</p>
                        </div>
                        <div class = "flex justify-between items-center my-1">
                            <p>Date Of Birth: </p>
                            <p>{{ (userDetails.data.value?.data as UserDetails).dob }}</p>
                        </div>
                    </div>
                    
                    <hr class = "border-[#A3A1A1]" />
                    <div class = "flex justify-between items-center mt-2">
                        <h1 class = "font-bold text-md md:text-xl">Download Certicate </h1>
                        <a :href = "(userDetails.data.value?.data as UserDetails).certificate"><span class="material-symbols-outlined">download</span></a>
                    </div>
                </DropCard>
            </div>
            <div>
                <DropCard cardTitle = "Aadhar Information">
                    <img :src = "(userDetails.data.value?.data as UserDetails).aadhar" class = "rounded-lg border-2 border-grey mx-auto" alt = "member aadhar" />
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
    const userDetails = await useFetch<UserDetailsResponse>(`/api/userDetails/fetch?tagId=${id.value}`)

    interface UserDetailsResponse {
        message : string,
        data : {
            dob? : string,
            email? : string,
            membershipStatus? : string,
            name? : string,
            nfcID? : string,
            phoneNumber? : string,
            image? : string,
            validDate? : string,
            verified? : boolean,
            aadhar? : string,
            certificate? : string
        } | string
    }

    interface UserDetails {
        dob? : string,
        email? : string,
        membershipStatus? : string,
        name? : string,
        nfcID? : string,
        phoneNumber? : string,
        image? : string,
        validDate? : string,
        verified? : boolean,
        aadhar? : string,
        certificate? : string
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
        mask-image: url("/Ellipse 7.png");
        mask-repeat: no-repeat;
        mask-position: center center;
        mask-size: contain;
        mask-origin: border-box;
    }
</style>