<template>
    <div class="flex flex-col grow">
        <payement ref="payement"></payement>
        <fb-title> Addons </fb-title>
        <div class="flex flex-row flex-wrap justify-center h-fit m-4 pt-4">

            <div
                v-for="addon in addons"
                class="bg-slate-700 show-up rounded-lg border-2 border-slate-600 md:m-4 m-2 overflow-hidden transition-all"
                :class="addon.purchased? ' select-none ': ' shadow-lg hover:shadow-xl hover:border-slate-500'"
                :style="'animation-delay: '+addons.indexOf(addon)+'00ms'">
                <div class="flex flex-col w-min min-h-[20em]">
                    <div class="flex flex-col">
                        <h1
                            class="bg-slate-600 text-2xl font-bold text-center px-10 whitespace-nowrap py-2"
                            :class="addon.purchased? ' text-slate-400' : ' text-slate-200'"
                        > {{ addon.title }} </h1>
                    </div>
                    <div class="flex grow flex-col justify-between ml-auto p-4">
                        <h2
                            class="text-xl font-bold"
                            :class="addon.purchased? ' text-slate-500': ' text-slate-400'"
                        > {{ addon.description }} </h2>
                        <div
                            class="flex flex-row ml-auto border-2 rounded px-2"
                            :class="addon.purchased? ' border-slate-600 bg-slate-700': ' border-slate-500 bg-slate-600 shadow-md'"
                        >
                            <h1 :class="addon.purchased? 'text-slate-400': 'text-slate-200'" class=" text-2xl font-bold"> {{ addon.price }} </h1>
                            <h2 :class="addon.purchased? 'text-slate-600': 'text-slate-400'" class=" text-xl font-bold mx-1"> {{ addon.currency }} </h2>
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
        purchased: false,
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