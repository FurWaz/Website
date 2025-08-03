<template>
    <div class="flex bg-indigo-200 dark:bg-indigo-700 w-full lg:w-3/4 lg:max-w-[60em] h-fit rounded-md border-2 border-indigo-500 dark:border-indigo-500 shadow-2xl shadow-indigo-500/50">
        <div class="bg-pypoll flex flex-col justify-between items-center space-y-8 md:space-y-16 p-8 w-full">
            <div class="flex space-x-4 justify-center items-center">
                <img src="https://pypoll.com/img/icon.png" alt="Pypoll" class="w-12 h-12 md:w-16 md:h-16" />
                <h3 class="text-3xl md:text-4xl font-bold">  {{ $t('home.myApps.pypoll.title') }}  </h3>
            </div>
            <div class="flex flex-col space-y-4 justify-center items-center">
                <div>
                    <p class="text-base md:text-lg text-center"> {{ $t('home.myApps.pypoll.description1') }} </p>
                    <p class="text-base md:text-lg text-center"> {{ $t('home.myApps.pypoll.description2') }} </p>
                </div>
                <div>
                    <p class="text-base md:text-lg text-center"> {{ $t('home.myApps.pypoll.description3') }} </p>
                    <p class="text-base md:text-lg text-center"> {{ $t('home.myApps.pypoll.description4') }} </p>
                </div>
            </div>
            <div class="flex space-x-4 justify-center items-center">
                <UButton icon="i-heroicons-chevron-right" trailing variant="ghost" size="xl" color="neutral"
                    to="https://pypoll.com" target="_blank">
                    {{ $t('home.myApps.pypoll.action') }} 
                </UButton>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style>
.bg-pypoll {
    background: radial-gradient(circle at 50% 100%, #6366f180 0%, #33415500 60%),
                radial-gradient(circle at 100% 0%, #6366f180 0%, #33415500 60%),
                radial-gradient(circle at 0% 50%, #6366f170 0%, #33415500 40%);
}
</style>