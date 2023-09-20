<template>
    <div :class = "props.class" class = "bg-white border-2 border-grey rounded-xl my-10 max-w-[400px] mx-auto p-5 font-[Roboto] text-[#1E2968] shadow-md">
        <h1 class = "font-bold text-xl">{{ props.cardTitle }}</h1>
        <div class ="py-1">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
    interface PropTypes {
        cardTitle? : string,
        class? : string
    }

    const props = withDefaults(defineProps<PropTypes>(), {
        cardTitle : "Card Title",
        class : ""
    })
</script>