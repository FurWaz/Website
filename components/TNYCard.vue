<template>
    <div class="flex w-full lg:w-3/4 lg:max-w-[70em] h-fit bg-fuchsia-200/10 dark:bg-fuchsia-400/20 rounded-xl border-2 border-fuchsia-500/50 shadow-2xl shadow-fuchsia-500/20 overflow-hidden">
        <div class="bg-tny flex flex-col justify-between items-center space-y- md:space-y-8 p-8 w-full">
            <div class="flex space-x-4 justify-center items-center">
                <img src="https://tny-robotics.com/icon-border.png" alt="TNY Robotics" class="w-12 h-12 md:w-16 md:h-16 rounded-lg" />
                <h3 class="text-3xl md:text-4xl font-bold"> {{ $t('home.myProjects.tny.title') }} </h3>
            </div>
            <div class="flex w-full h-fit">
                <div class="flex w-1/2 flex-col space-y-4 justify-center items-center px-4">
                    <p class="text-base md:text-lg text-center"> {{ $t('home.myProjects.tny.description1') }} </p>
                    <div>
                        <p class="text-base md:text-lg text-center"> {{ $t('home.myProjects.tny.description2') }} </p>
                        <p class="text-base md:text-lg text-center"> {{ $t('home.myProjects.tny.description3') }} </p>
                    </div>
                </div>
                <div class="flex w-1/2 h-full justify-center">
                    <img src="https://tny-robotics.com/_nuxt/tny360-full.B8pxtxQW.png" alt="TNY-360 Robot" class="flex w-[80%] h-full pl-8">
                </div>
            </div>
            <div class="flex space-x-4 justify-center items-center">
                <UButton icon="i-heroicons-chevron-right" trailing variant="ghost" size="xl" color="neutral"
                    to="https://tny-robotics.com" target="_blank">
                    {{ $t('home.myProjects.tny.action') }} 
                </UButton>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style>
.bg-tny {
    background: radial-gradient(circle at 50% 100%, #e12afb50 0%, #e12afb00 60%),
                radial-gradient(circle at 100% 0%, #e12afb50 0%, #e12afb00 60%),
                radial-gradient(circle at 0% 50%, #e12afb50 0%, #e12afb00 40%);
}
</style>