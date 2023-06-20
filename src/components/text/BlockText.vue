<template>
    <p
        v-for="line in text.split('\n')"
        :key="line"
        class="text-md md:text-lg font-semibold text-slate-600 dark:text-slate-300 my-1 min-h-[1em]"
    >
        {{ line }}
    </p>
</template>

<script>
export default {
    name: "BlockText",
    props: {
        text: {
            type: String,
            default: '',
            required: true
        }
    }
}
</script>