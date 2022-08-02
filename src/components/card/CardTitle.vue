<template>
    <div class="flex flex-col mb-3">
        <h2 class="mx-4 my-1 text-extrabold text-2xl card-title text-black whitespace-nowrap"><slot></slot></h2>
        <span class="bg-black h-[3px] w-full"></span>
    </div>
</template>

<script>
export default {
    name: "CardTitle",
    setup() {
        
    }
}
</script>

<style>
.card-title {
    font-family: "Roboto bold";
}
</style>