<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        :viewBox="viewBox"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round" 
        stroke="currentColor"
        class="text-slate-600 dark:text-slate-400"
    >
        <slot />
    </svg>
</template>


<script>
export default {
    name: "SvgText",
    props: {
        viewBox: {
            type: String,
            default: "0 0 24 24",
            required: false,
        },
    }
}
</script>