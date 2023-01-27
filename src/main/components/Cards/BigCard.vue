<template>
    <div
        :href="data.href"
        class="flex flex-col border-2 border-slate-600 rounded-lg px-4 py-1 md:mx-8 mx-4 my-4 min-w-[18em] max-w-[320px] translate-y-0
               bg-slate-700 shadow-lg hover:border-slate-500 hover:shadow-xl hover:-translate-y-1 cursor-pointer transition-all"
    >
        <div class="flex w-fit mx-auto min-w-min px-8">
            <h1 class="text-slate-50 text-4xl font-bold mx-auto mt-2 whitespace-nowrap"> {{ data.title }} </h1>
        </div>
        <div class="flex w-fit mx-auto h-fit flex-col px-2 py-6 justify-center">
            <div class="flex mx-auto w-fit h-fit rounded-lg bg-slate-800">
                <svg xmlns="http://www.w3.org/2000/svg" v-html="data.icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="text-orange-500 w-24">
                    
                </svg>
            </div>
        </div>
        <div class="flex flex-col mx-auto w-fit grow p-2 space-y-4 justify-between">
            <div class="flex mx-auto w-fit h-fit">
                <p class="text-slate-300 font-semibold text-lg text-center"> {{ data.description }} </p>
            </div>
            <div class="flex w-fit justify-evenly">
                <button-block class="m-1" :href="data.href"> {{ data.link }} </button-block>
            </div>
        </div>
    </div>
</template>

<script>
import ButtonBlock from '../buttons/ButtonBlock.vue';

function setup(obj) {
    const el = obj.$el;
    el.addEventListener("click", ev => {
        obj.$router.push(obj.data.href).then(() => {
            window.app.sidebar.update();
        });
        ev.preventDefault();
    });
}

export default {
    name: "PresCard",
    components: {
        ButtonBlock
    },
    methods: {},
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    data() { return { }; },
    setup() {},
    mounted() {
        setup(this);
    }
};
</script>