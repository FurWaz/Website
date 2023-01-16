<template>
    <div class="flex grow flex-col min-w-0 min-h-0 bg-slate-700">
        <router-view></router-view>
        <div class="flex flex-col grow-0 h-fit justify-center text-center pb-1">
            <p class="text-slate-500 text-xl font-bold"> FurWaz </p>
            <p class="text-slate-500 text font-semibold"> {{ 'Copyright &copy; ' + year + ' FurWaz' }} </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            year: new Date().getFullYear()
        }
    },
    mounted: () => {
        console.log("URL requested : " + window.location.href);
    }
};
</script>

<style>
</style>