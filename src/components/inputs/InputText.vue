<template>
    <div class="flex grow h-fit w-full md:flex-row min-w-0 flex-col justify-between md:space-x-8 md:items-center md:my-2 my-1">
        <label
            v-if="label != ''"
            class="flex text-lg dark:text-slate-400 font-bold whitespace-nowrap text-ellipsis w-fit"
        >
            {{ label }}
        </label>
        <input
            ref="input"
            class="flex h-fit border-2 rounded-md px-2 py-1 border-slate-200 dark:border-slate-600 font-bold text-md whitespace-nowrap max-w-full
                   min-w-0 text-ellipsis transition-colors outline-2 outline-offset-2 outline-orange-500 focus:outline placeholder-slate-600/[0.5]"
            :class="disabled ? ' bg-slate-100 dark:bg-slate-700 text-slate-300 dark:text-slate-400 ' : ' bg-white dark:bg-slate-600 text-slate-400 dark:text-slate-200 hover:border-slate-300 hover:dark:border-slate-500 '"
            :placeholder="placeholder"
            :type="type"
            :name="name"
            :value="value"
            :min="min"
            :max="max"
            :disabled="disabled"
        >
    </div>
</template>

<script>
export default {
    name: 'InputText',
    props: {
        label: {
            type: String,
            default: '',
            required: false
        },
        placeholder: {
            type: String,
            default: '',
            required: false
        },
        value: {
            type: String,
            default: '',
            required: false
        },
        name: {
            type: String,
            default: '',
            required: false
        },
        type: {
            type: String,
            default: 'text',
            required: false
        },
        min: {
            type: [Number, String],
            default: "",
            required: false
        },
        max: {
            type: [Number, String],
            default: "",
            required: false
        },
        disabled: {
            type: [Boolean, String],
            default: false,
            required: false
        }
    },
    data() {
        return {isDisabled: true}
    },
    mounted() {
        this.focus = () => this.$refs.input.focus();
        this.getValue = () => this.$refs.input.value;
    }
}
</script>