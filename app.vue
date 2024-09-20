<template>
    <div>
        <NuxtRouteAnnouncer />
        
    </div>
    <div class="flex flex-col bg-slate-50 dark:bg-slate-700 min-h-screen">
        <HeaderView />
        <NuxtPage class="flex flex-col grow" />
    </div>
</template>

<script setup lang="ts">
import '~/assets/style.css';
</script>