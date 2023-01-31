<template>
    <div class="flex flex-col grow">
        <payement ref="payement"></payement>
        <fb-title> Addons </fb-title>
        <div class="flex flex-row flex-wrap justify-center h-fit m-4 pt-4">

            <div
                v-for="addon in addons"
                class="dark:bg-slate-700 bg-slate-200 show-up rounded-lg border-2 dark:border-slate-600 border-slate-300 md:m-4 m-2 overflow-hidden transition-all"
                :class="addon.purchased? ' select-none ': ' shadow-lg hover:shadow-xl hover:dark:border-slate-500 hover:border-slate-400'"
                :style="'animation-delay: ' + (addons.indexOf(addon) * 100) + 'ms;'">
                <div class="flex flex-col w-min min-h-[20em]">
                    <div class="flex flex-col">
                        <h1
                            class="dark:bg-slate-600 bg-slate-400 text-2xl font-bold text-center px-10 whitespace-nowrap py-2"
                            :class="addon.purchased? ' dark:text-slate-400 text-slate-200' : ' dark:text-slate-200 text-slate-50'"
                        > {{ addon.title }} </h1>
                    </div>
                    <div class="flex grow flex-col justify-between ml-auto p-4">
                        <h2
                            class="text-xl font-bold"
                            :class="addon.purchased? ' dark:text-slate-500 text-slate-400': ' dark:text-slate-400 text-slate-600'"
                        > {{ addon.description }} </h2>
                        <div
                            class="flex flex-row ml-auto border-2 rounded px-2"
                            :class="addon.purchased? ' dark:border-slate-600 border-slate-400 dark:bg-slate-700 bg-slate-300': ' dark:border-slate-500 border-slate-400 dark:bg-slate-600 bg-slate-300 shadow-md'"
                        >
                            <h1 :class="addon.purchased? 'dark:text-slate-400 text-slate-400': 'dark:text-slate-200 text-slate-500'" class=" text-2xl font-bold"> {{ addon.price }} </h1>
                            <h2 :class="addon.purchased? 'dark:text-slate-500 text-slate-400': 'dark:text-slate-400 text-slate-600'" class=" text-xl font-bold mx-1"> {{ addon.currency }} </h2>
                        </div>
                        <div class="flex flex-row mx-auto">
                            <button-block
                                :action="() => { addon.onclick({price: addon.price, currency: addon.currency, label: addon.title}); }"
                                :disabled="addon.purchased"
                            > {{ addon.purchased? 'Purchased' : 'Get addon' }} </button-block>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ButtonBlock from '../../main/components/buttons/ButtonBlock.vue';
import FbTitle from '../components/FbTitle.vue';
import Payement from '../../main/components/forms/Payement.vue';

const addons = [
    {
        title: "Kinect tracking",
        description: "Track your body using a Microsoft Kinect",
        price: "4.99",
        currency: "€",
        purchased: false,
        onclick: (obj) => { purchase(obj) }
    },
    {
        title: "Third tracking camera",
        description: "Add a third tracking camera to your setup",
        price: "1.99",
        currency: "€",
        purchased: true,
        onclick: (obj) => { purchase(obj) }
    },
    {
        title: "60 FPS body tracking",
        description: "Enable 60 Frames per seconds body tracking",
        price: "2.49",
        currency: "€",
        purchased: false,
        onclick: (obj) => { purchase(obj) }
    },
    {
        title: "Smooth body tracking",
        description: "Smooth body movements to clean up the tracking",
        price: "1.49",
        currency: "€",
        purchased: false,
        onclick: (obj) => { purchase(obj) }
    }
];

let page = null;

function purchase(data) {
    if (page == null) return;
    //page.$refs["payement"].display(data.label, data.price, data.currency);
}

export default {
    name: "Home",
    components: {
        ButtonBlock,
        FbTitle,
        Payement
    },
    methods: { purchase },
    data() { return { addons }; },
    setup() {},
    mounted() {
        page = this;
    }
};
</script>

<style>

</style>