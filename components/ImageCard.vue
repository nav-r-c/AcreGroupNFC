<template>
    <div class = "mx-auto text-center font-[Roboto] border-b-2 py-5 text-[#1E2968] bg-transparent">
        <img :src = "props.imageLink" alt = "Place" class = "w-[80%] mx-auto rounded-md" />
        
        <div class = "my-2">
            <h1 class = "font-semibold text-lg">{{ props.title }}</h1>
            <NuxtLink :to="props.mapLink" class = "flex justify-center items-center"><span class="material-symbols-outlined text-[#0A5D00]">location_on</span><p class = "text-sm">{{ props.location }}</p></NuxtLink>
        </div>
        <p class = "w-[80%] mx-auto text-sm my-1">{{ props.description }}</p>

        <div class = "mt-5">
            <NuxtLink :to="cardLink" class = "bg-[#0A5D00] text-white p-2 rounded-md">Know More</NuxtLink>
        </div>

    </div>
</template>

<script setup lang="ts">
    interface PropTypes {
        description? : string,
        imageLink? : string,
        location? : string,
        mapLink? : string,
        title? : string
    }

    const props = withDefaults(defineProps<PropTypes>(), {
        description : "A very nice description",
        imageLink : "/kodai.png",
        location: "Somewhere",
        mapLink: "https://www.google.com/maps",
        title: "A very nice place"
    })

    const cardLink = computed(() => `/${props.title.replace(/ /g, '+')}`)


</script>