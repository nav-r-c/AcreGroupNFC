<template>
    <div class = "mx-auto text-center font-[Arial]">
        <h1 class = "font-bold text-2xl my-2">Verification Form</h1>
        <div>
            <form class = "flex flex-col w-[30%] mx-auto text-left">
                <label for = "phone-number">Phone Number: </label>
                <input class = "border-2 rounded-md p-1" id = "phone-number" type = "number" placeholder="e.g. 95129226200" v-bind:form="phoneNumber" required />

                <label for = "verif-code">Verification Code: </label>
                <input class = "border-2 rounded-md p-1" id = "verif-code" placeholder = "e.g. ABC123" v-bind:form="verifCode" required/>

                <button type = "submit" class = "border-2 w-[20%] text-center mx-auto p-2 rounded-md my-2">Submit</button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
    const phoneNumber = ref();
    const verifCode = ref("");

    

</script>