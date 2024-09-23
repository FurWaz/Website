<template>
    <div class="flex card p-4 justify-center items-center space-x-4">
        <div class="flex flex-col w-full h-full justify-center items-start">
            <h3> {{ appName }} </h3>
            <p class="text-sm"> {{ $t('account.connections.firstDate', { date }) }} </p>
        </div>
    </div>
</template>

<script lang="ts" setup>
type Connection = { id: number; appId: number; };
defineProps<{
    connection: Connection
}>();

const appName = ref<string>('- - - - -');
const date = new Date().toLocaleDateString();
setTimeout(() => {
    appName.value = 'Store';
}, 500);
</script>
