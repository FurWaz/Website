<template>
    <div
        :class="showing? 'opacity-1 pointer-events-all': 'opacity-0 pointer-events-none'"
        class="flex flex-col justify-center fixed z-50 top-0 bottom-0 right-0 left-0 bg-black/[0.3] transition-all"
        v-on:click="hide()"
    >
        <div class="w-fit mx-auto">
            <div class="flex flex-col rounded-lg bg-slate-700 border-2 border-slate-600 shadow-xl w-[500px] md:max-w-[80vw] md:max-h-[80vh] max-w-[95vw] max-h-[80vh] overflow-hidden">
                <div class="flex flex-row justify-between w-full h-fit py-1 bg-slate-600 space-x-6 px-2">
                    <p class="text-white text-lg font-extrabold w-full"> Payement </p>
                </div>
                <div ref="inputs" class="flex flex-col w-full h-fit md:px-4 px-2 md:pb-4 pb-2 min-h-0">
                    <p class="text-slate-400 text-lg font-bold mt-2 mb-2 mx-auto"> {{ this.label }} </p>
                    <div class="flex flex-row mx-auto border-2 rounded px-2 border-slate-500 bg-slate-600 shadow-md mb-8">
                        <h1 class="text-slate-200 text-xl font-bold"> {{ this.amount }} </h1>
                        <h2 class="text-slate-400 text-lg font-bold mx-1"> {{ this.currency }} </h2>
                    </div>
                    <div id="paypal-button-container" class="overflow-auto min-h-0 bg-slate-200 rounded-md p-1"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Popup from './Popup.vue';

function initPayPalButton(amount, currency) {
    document.getElementById("paypal-button-container").innerHTML = "";
    paypal.Buttons({
        style: {
            shape: 'rect',
            color: 'blue',
            layout: 'vertical',
            label: 'paypal',
            
        },

        createOrder: function(data, actions) {
            return actions.order.create({
            purchase_units: [{"amount":{"currency_code":"EUR","value": amount}}]
            });
        },

        onApprove: function(data, actions) {
            return actions.order.capture().then(function(orderData) {
            
            // Full available details
            console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));

            // Show a success message within this page, e.g.
            const element = document.getElementById('paypal-button-container');
            element.innerHTML = '';
            element.innerHTML = '<h3>Thank you for your payment!</h3>';
            });
        },

        onError: function(err) {
            console.log(err);
        }
    }).render('#paypal-button-container');
}

function setup() {
    console.log("script created");
    const script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?client-id=ASs79_90F1pURALqVrAvbIClb9M-xMyMfCIiYzOTUIPNfkkzKZpq_ls7MN-aMhGwZEejyw5DvmKMHq0p&currency=EUR";
    document.body.appendChild(script);
    script.addEventListener("load", function() {
        console.log("script loaded");
    });
}

export default {
    name: "Payement",
    methods: {
        display(label, amount, currency) {
            this.showing = true;
            this.label = label;
            this.amount = amount;
            this.currency = currency;
            this.$el.firstElementChild.firstElementChild.classList.add("spawn-up");
            initPayPalButton(amount, currency);
        },
        hide() {
            this.showing = false;
            this.$el.firstElementChild.firstElementChild.classList.remove("spawn-up");
        }
    },
    components: {
        Popup
    },
    data() { return { showing: false, label: "Label", amount: "0", currency: "€" }; },
    setup() {},
    mounted() {
        setup();
        this.hide();
    }
};
</script>