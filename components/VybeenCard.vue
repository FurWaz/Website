<template>
    <div class="flex bg-green-200 dark:bg-green-700 w-full lg:w-3/4 lg:max-w-[60em] h-fit rounded-md border-2 border-green-500 dark:border-green-500 shadow-2xl shadow-green-500/50">
        <div class="bg-vybeen flex flex-col justify-between items-center space-y-8 md:space-y-16 p-8 w-full">
            <div class="flex space-x-4 justify-center items-center">
                <img src="https://vybeen.projects.furwaz.com/img/favicon.png" alt="Vybeen" class="w-12 h-12 md:w-16 md:h-16 bg-slate-700 rounded-lg p-3" />
                <h3 class="text-3xl md:text-4xl font-bold"> {{ $t('home.myApps.vybeen.title') }} </h3>
            </div>
            <div class="flex flex-col space-y-4 justify-center items-center">
                <div>
                    <p class="text-base md:text-lg text-center"> {{ $t('home.myApps.vybeen.description1') }} </p>
                    <p class="text-base md:text-lg text-center"> {{ $t('home.myApps.vybeen.description2') }} </p>
                </div>
                <div>
                    <p class="text-base md:text-lg text-center"> {{ $t('home.myApps.vybeen.description3') }} </p>
                    <p class="text-base md:text-lg text-center"> {{ $t('home.myApps.vybeen.description4') }} </p>
                </div>
            </div>
            <div class="flex space-x-4 justify-center items-center">
                <UButton icon="i-heroicons-chevron-right" trailing variant="ghost" size="xl" color="neutral"
                    to="https://vybeen.projects.furwaz.com" target="_blank">
                    {{ $t('home.myApps.vybeen.action') }} 
                </UButton>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style>
.bg-vybeen {
    background: radial-gradient(circle at 50% 100%, #22c55e80 0%, #33415500 60%),
                radial-gradient(circle at 100% 0%, #22c55e80 0%, #33415500 60%),
                radial-gradient(circle at 0% 50%, #22c55e70 0%, #33415500 40%);
}
</style>