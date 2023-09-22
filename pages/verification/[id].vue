<template>
    <div>
        <img src = "/logo-whitebg.png" class = "absolute z-10 mx-auto left-0 right-0 my-5" alt = "acre-group-logo"/>
    </div>
    <div class = "mx-auto left-0 right-0 text-center font-[Roboto] absolute top-[25%] z-10">
        <h1 class = "font-bold text-4xl my-5 text-white drop-shadow-xl">Profile Verification</h1>

        <form class = "flex flex-col mx-auto text-left">
            <div class = "bg-[#0A5D00] flex flex-col text-white max-w-[400px] w-[80vw] mx-auto rounded-lg px-5 py-10 shadow-lg">
                <label for = "phone-number" class = "mb-1 font-bold">Phone Number: </label>
                <input class = "border-2 rounded-md p-1 outline-none text-black mb-5" id = "phone-number" placeholder="e.g. 95129226200" v-model="phoneNumber" required />

                <label for = "verif-code" class = "mb-1 font-bold">Verification Code: </label>
                <input class = "border-2 rounded-md p-1 outline-none text-black mb-5" id = "verif-code" placeholder = "e.g. ABC123" v-model="verifCode" required/>
            </div>
            <button type = "submit" class = "border-2 text-center mx-auto my-10 py-2 px-10 rounded-md text-white transition all ease-in-out hover:bg-white hover:text-[#3d3d3d]" @click.prevent="handleSubmit">Submit</button>
        </form>
    </div>

    <img src = "/kodai-phone.png" class = "w-screen h-screen" />

    <!-- <div class = "text-white underline text-center absolute mx-auto left-0 right-0 text-xl bottom-0 my-5">
        <NuxtLink to="/">Terms And Services</NuxtLink>
    </div> -->
</template>

<script setup lang="ts">
    const phoneNumber = ref("");
    const verifCode = ref("");

    const route = useRoute()
    const router = useRouter();
    const cardID = route.params.id?.toString()

    interface FetchedResponse {
        message : string
        data : {
            tagId : string
        }
    }

    const handleSubmit = async () => {
        const resp = await useFetch<FetchedResponse | null >(`/api/userDetails/verify?phoneNumber=${phoneNumber.value}&verifCode=${verifCode.value}&cardID=${cardID}`, {
            method : "post"
        })
        // console.log(`/api/userDetails/verify?phoneNumber=${phoneNumber.value}&verifCode=${verifCode.value}&cardID=${cardID}`);
        // console.log(tagId)
        // console.log(phoneNumber.value)
        // console.log(verifCode.value)
        // console.log(cardID)
        if (resp && resp.data) {
            // console.log(resp.data.value?.message)

            if (resp.data.value?.message === "User Verified and Tag Set") {
                router.push(`/profile/${resp.data.value?.data.tagId}~${cardID}`);
            }
            else {
                if (resp.data.value?.message === "User Not Verified"){
                    alert("Incorrect Phone Number and/or verification code.")
                }
                else {
                    alert(resp.data.value?.message);
                }
            }
            
        }
        else {
            alert("You are not in our records.")
        }

    }

</script>