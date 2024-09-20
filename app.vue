<template>
    <div>
        <NuxtRouteAnnouncer />
        
    </div>
    <div class="flex flex-col bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-50 min-h-screen">
        <HeaderView />
        <NuxtPage class="flex flex-col grow" />
    </div>
</template>

<script setup lang="ts">
import '~/assets/style.css';
</script>