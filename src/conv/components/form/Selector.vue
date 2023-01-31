<template>
    <div class="flex grow-0 justify-evenly rounded-lg overflow-hidden border-2 dark:border-teal-50 border-slate-200">
        <div
            v-for="item in data"
            :id="'item-'+item.id"
            v-on:click="() => select(item.id, true)"
            class="flex w-full flex-col px-2 py-1 dark:bg-slate-700 bg-slate-50 hover:dark:bg-teal-50/[0.2] hover:bg-slate-200 cursor-pointer select-none transition-all rounded-md">
            <p class="text-md text-center text-bold dark:text-teal-50 text-slate-600"> {{ item.value }} </p>
        </div>
    </div>
</template>

<script>

export default {
    name: "Selector",
    components: {},
    methods: {  },
    props: {
        data: {
            type: Array,
            required: false,
            default: []
        },
        onchange: {
            type: Function,
            required: false,
            default: undefined
        },
        onload: {
            type: Function,
            required: false,
            default: undefined
        }
    },
    mounted() {
        this.$el.value = null;

        this.setItemSelected = id => {
            const el = this.$el.querySelector("#item-"+id);
            el.classList.add("bg-teal-500", "hover:bg-teal-500/[0.2]");
            el.classList.remove("hover:bg-teal-50/[0.2]");
        }
        this.setItemDeselected = id => {
            const el = this.$el.querySelector("#item-"+id);
            el.classList.remove("bg-teal-500", "hover:bg-teal-500/[0.2]");
            el.classList.add("hover:bg-teal-50/[0.2]");
        }

        this.select = (id, emitEvent=false) => {
            if (id == this.$el.value) {
                id = null;
            }
            this.$el.value = id;
            if (emitEvent && this.onchange) {
                this.onchange(id);
            }
            this.data.forEach(el => {
                if (el.id == id) {
                    this.setItemSelected(id);
                } else {
                    this.setItemDeselected(el.id);
                }
            });
        }

        if (this.onload) {
            this.onload(this);
        }
    }
}
</script>