<template>
    <div class="flex card p-4 justify-center items-center space-x-4">
        <div class="flex w-fit h-full justify-center items-center">
            <img :src="application.icon" class="min-w-fit w-12 h-12" />
        </div>
        <div class="flex flex-col w-full h-full justify-center items-start">
            <h3> {{ application.name }} </h3>
            <p class="text-slate-600 dark:text-slate-300"> {{ application.description }} </p>
        </div>
    </div>
</template>

<script lang="ts" setup>
type Application = { id: number; name: string; description: string; icon: string; };
defineProps<{
    application: Application
}>();
</script>
