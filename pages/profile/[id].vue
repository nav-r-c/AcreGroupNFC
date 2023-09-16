<template>
    <div>
        <h1>Profile Page</h1>
        <div v-if="userExists">
            <h1>User Exists</h1>
        </div>
        <div v-else>
            <h1>User Does not exist</h1>
        </div>
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
            verified? : boolean
        } | string
    }

    const userExists = computed(() => {
        if (userDetails && userDetails.data && userDetails.data.value){
            return userDetails.data.value.message === "User Found"
        }
    })

</script>