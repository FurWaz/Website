<template>
    <div class="flex bg-sky-200 dark:bg-sky-700 w-full lg:w-3/4 lg:max-w-[60em] h-fit rounded-md border-2 border-sky-500 dark:border-sky-500 shadow-2xl shadow-sky-500/50">
        <div class="bg-fullbowody flex flex-col justify-between items-center space-y-8 md:space-y-16 p-8 w-full">
            <div class="flex space-x-4 justify-center items-center">
                <img src="https://fullbowody.com/img/transparent.png" alt="FullBowody" class="w-12 h-12 md:w-16 md:h-16 bg-slate-700 rounded-lg" />
                <h3 class="text-3xl md:text-4xl font-bold"> {{ $t('home.myApps.fullbowody.title') }} </h3>
            </div>
            <div class="flex flex-col space-y-4 justify-center items-center">
                <div>
                    <p class="text-base md:text-lg text-center"> {{ $t('home.myApps.fullbowody.description1') }} </p>
                    <p class="text-base md:text-lg text-center"> {{ $t('home.myApps.fullbowody.description2') }} </p>
                </div>
                <div>
                    <p class="text-base md:text-lg text-center"> {{ $t('home.myApps.fullbowody.description3') }} </p>
                    <p class="text-base md:text-lg text-center"> {{ $t('home.myApps.fullbowody.description4') }} </p>
                </div>
            </div>
            <div class="flex space-x-4 justify-center items-center">
                <UButton icon="i-heroicons-chevron-right" trailing variant="ghost" size="xl" color="neutral"
                    to="https://fullbowody.com" target="_blank">
                    {{ $t('home.myApps.fullbowody.action') }} 
                </UButton>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style>
.bg-fullbowody {
    background: radial-gradient(circle at 50% 100%, #0ea5e980 0%, #33415500 60%),
                radial-gradient(circle at 100% 0%, #0ea5e980 0%, #33415500 60%),
                radial-gradient(circle at 0% 50%, #0ea5e970 0%, #33415500 40%);
}
</style>