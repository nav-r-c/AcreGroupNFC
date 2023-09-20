<template>
    <div v-if="userExists">
        <div class = "mx-auto text-center font-[Roboto] text-white">
            <div class = "bg-[#0A5D00] rounded-b-3xl mx-auto">
                <img src ="~/public/logo.png" class = "mx-auto py-2 w-[50px]" />
                <h1 class="font-bold text-white text-4xl my-5 drop-shadow-lg drop-shadow-white">Personal Profile</h1>
                <img :src = "(userDetails.data.value?.data as UserDetails).image" class = "mx-auto max-w-[400px] w-auto" />
                <p class = "text-3xl my-2"><span class = 'font-bold'>{{ (userDetails.data.value?.data as UserDetails)?.name?.split(" ")[0] }}</span> <span>{{ (userDetails.data.value?.data as UserDetails)?.name?.split(" ").slice(1).join(" ") }}</span></p>
                <div class = "py-5 pb-20">
                    <p class = "text-xl">Membership Status: <span class = "font-bold">{{ (userDetails.data.value?.data as UserDetails)?.membershipStatus }}</span></p>
                    <p class = "text-xl">Valid from: <span class = "font-bold">{{ (userDetails.data.value?.data as UserDetails)?.validDate }}</span></p>
                </div>
                
            </div>
        </div>

        <div class = "-my-20">
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
                    <h1 class = "font-bold text-xl">Download Certicate </h1>
                    
                </div>
            </DropCard>
        </div>

        <div class = "mt-[120px]">
            <DropCard cardTitle = "Aadhar Information">
                <img :src = "(userDetails.data.value?.data as UserDetails).aadhar" class = "rounded-lg border-2 border-grey" />
            </DropCard>
        </div>

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
            aadhar? : string
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
        aadhar? : string
    }

    const userExists = computed(() => {
        if (userDetails && userDetails.data && userDetails.data.value){
            return userDetails.data.value.message === "User Found"
        }
    })

</script>