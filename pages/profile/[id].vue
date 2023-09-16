<template>
    <div>
        <h1>Profile Page</h1>
        <div v-if="userExists">
            <p>Name: {{ (userDetails.data.value?.data as UserDetails)?.name }}</p>
            <p>Phone Number: {{ (userDetails.data.value?.data as UserDetails)?.phoneNumber }}</p>
            <p>DOB: {{ (userDetails.data.value?.data as UserDetails)?.dob }}</p>
            <p>E-Mail: {{ (userDetails.data.value?.data as UserDetails)?.email }}</p>
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

    interface UserDetails {
        dob? : string,
        email? : string,
        membershipStatus? : string,
        name? : string,
        nfcID? : string,
        phoneNumber? : string,
        verified? : boolean
    }

    const userExists = computed(() => {
        if (userDetails && userDetails.data && userDetails.data.value){
            return userDetails.data.value.message === "User Found"
        }
    })

</script>