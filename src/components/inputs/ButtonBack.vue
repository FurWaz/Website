<template>
    <div class="no-scroll show-left flex w-fit max-w-full min-w-0">
        <button
            class="flex min-w-0 w-fit max-w-full py-1 px-1 outline-none outline-offset-4 rounded-md border-slate-300 dark:border-slate-600 border-2 transition-all"
            :class="disabled? ' cursor-default text-slate-400': ' focus:outline-orange-500 text-slate-500 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 hover:border-slate-400 dark:hover:border-slate-500'"
            @click="disabled ? '' : $router.go(-1)"
        >
            <chevron-left-icon class="md:w-8 w-6" />
        </button>
    </div>
</template>

<script>
import {
    ChevronLeftIcon
} from '@heroicons/vue/24/outline';

export default {
    name: 'ButtonBack',
    components: {
        ChevronLeftIcon
    },
    props: {
        disabled: {
            type: Boolean,
            default: false,
            required: false
        }
    },
    data() {
        return {}
    },
    mounted() {

    }
}
</script>