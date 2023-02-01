<template>
    <div class="flex grow h-fit w-full space-x-2">
        <div class="flex grow-0 flex-col justify-center">
            <p class="text-lg font-semibold dark:text-slate-300 text-slate-700"> {{ label }} </p>
        </div>
        <div class="flex grow justify-center border-2 border-slate-500 bg-slate-500 space-x-[2px] rounded-lg overflow-hidden">
            <div
                v-for="el in this.elements"
                :class="el.selected? ' text-slate-50 bg-orange-500 hover:bg-orange-400 ' : ' dark:text-slate-200 text-slate-700 dark:bg-slate-800 bg-slate-300 dark:hover:bg-slate-700 hover:bg-slate-300 '"
                :key="el.value"
                v-on:click="this.setSelected(el.value)"
                class="flex grow cursor-pointer">
                <p class="text-lg text-center font-semibold px-2 mx-auto"> {{ el.label }} </p>
            </div>
        </div>
    </div>
</template>

<script>

function setup(obj) {
    obj.setSelected = (el) => {
        if (obj.onchange) {
            obj.onchange(el);
        }
        obj.elements.forEach(item => {
            item.selected = item.value === el;
        });
        obj.$forceUpdate();
    };

    obj.elements = [];
    for (let i = 0; i < obj.list.length; i++) {
        const el = obj.list[i];
        obj.elements.push({
            label: el.label,
            value: el.value,
            selected: el.value === obj.value || el.selected
        });
    }
}

export default {
    name: 'Choice',
    data() {
        setup(this);
        return {};
    },
    components: {},
    methods: {},
    props: {
        label: {
            type: String,
            default: "",
            required: false
        },
        value: {
            type: String,
            default: "",
            required: false
        },
        list: {
            type: Array,
            default: [],
            required: true
        },
        onchange: {
            type: Function,
            required: false
        }
    },
    mounted() {}
}
</script>