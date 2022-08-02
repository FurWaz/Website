<template>
    <div class="flex flex-col justify-left w-full mb-3">
        <p class="my-1 text-extrabold text-md card-description text-black"><slot></slot></p>
    </div>
</template>

<script>
export default {
    name: "CardDecription",
    setup() {
        
    }
}
</script>

<style>
.card-description {
    font-family: "Roboto";
}
</style>