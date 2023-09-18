<template>
    <div class = "mx-auto text-center font-[Arial]">
        <h1 class = "font-bold text-2xl my-2">Verification Form</h1>
        <div>
            <form class = "flex flex-col w-[30%] mx-auto text-left">
                <label for = "phone-number">Phone Number: </label>
                <input class = "border-2 rounded-md p-1" id = "phone-number" placeholder="e.g. 95129226200" v-model="phoneNumber" required />

                <label for = "verif-code">Verification Code: </label>
                <input class = "border-2 rounded-md p-1" id = "verif-code" placeholder = "e.g. ABC123" v-model="verifCode" required/>

                <button type = "submit" class = "border-2 w-[20%] text-center mx-auto p-2 rounded-md my-2" @click.prevent="handleSubmit">Submit</button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
    const phoneNumber = ref();
    const verifCode = ref();

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
            console.log(resp.data.value?.message)

            if (resp.data.value?.message === "User Verified and Tag Set") {
                router.push(`/profile/${resp.data.value?.data.tagId}&${cardID}`);
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
            console.log("Response is null or does not have data")
        }

    }


</script>