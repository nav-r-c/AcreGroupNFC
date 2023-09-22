<template>
    <div class = "fixed bottom-0 mx-auto left-0 right-0 py-2 mt-10 rounded-t-lg bg-[#1E2968] text-white">
        <nav class = "flex justify-around">
            <NuxtLink :to = "profilePageRoute" class = "flex flex-col items-center justify-center"><span class="material-symbols-outlined">person</span>Profile</NuxtLink>
            <NuxtLink to = "/accomodations" class = 'flex flex-col items-center justify-center'><span class="material-symbols-outlined">domain</span>Accomodations</NuxtLink>
        </nav>
    </div>
</template>

<script setup lang = 'ts'>
    const profileId = inject('profileId');
    const profilePageRoute = computed(() => `/profile/${profileId}`)
</script>

<style scoped>
    .material-symbols-outlined {
        font-size: 28px;
    }
</style>