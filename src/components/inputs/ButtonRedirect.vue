<template>
    <div class="flex w-full max-w-full min-w-fit max-h-full min-h-fit h-fit">
        <router-link
            class="flex md:flex-col min-w-0 w-full max-w-full py-1 md:px-8 px-1 outline-none outline-offset-4 rounded-md justify-between items-center
                   md:space-y-2 md:space-x-0 space-x-2 border-slate-300 dark:border-slate-600 border-2 transition-all"
            :class="disabled? ' cursor-default text-slate-400': ' focus:outline-orange-500 text-slate-600 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 hover:border-slate-400 dark:hover:border-slate-500'"
            :to="disabled ? '' : href"
        >
            <component
                :is="icon"
                v-if="icon"
                class="w-8 md:mt-2 md:mb-0 my-1"
            />
            <p class="text-lg font-semibold whitespace-nowrap text-ellipsis overflow-hidden max-w-full min-w-0 w-fit h-fit max-h-full min-h-0 px-2">
                <slot />
            </p>
            <chevron-right-icon class="md:hidden flex w-6" />
        </router-link>
    </div>
</template>

<script>
import {
    ChevronRightIcon
} from '@heroicons/vue/24/outline';

export default {
    name: 'ButtonRedirect',
    components: {
        ChevronRightIcon
    },
    props: {
        href: {
            type: String,
            default: '',
            required: false
        },
        disabled: {
            type: Boolean,
            default: false,
            required: false
        },
        icon: {
            type: Function,
            default: null,
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