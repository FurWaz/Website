<template>
    <div>
        <NuxtRouteAnnouncer />
        
    </div>
    <div class="flex flex-col bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-50 min-h-screen">
        <HeaderView />
        <NuxtPage class="flex flex-col grow py-4 px-2" />
    </div>
</template>

<script setup lang="ts">
import '~/assets/style.css';
</script>