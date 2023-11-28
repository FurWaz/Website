<template>
    <div class="flex flex-col grow h-full w-full justify-evenly items-center text-slate-200">
        <icon-header
            class="pb-2"
            label="Paiement"
        />
        <div
            v-if="pageType == 'success'"
            class="p-2"
        >
            <form-card
                class="max-w-full w-fit h-fit p-2"
                :display-icon="false"
                :on-validate="() => $router.push('/')"
                :validate="'Continuer'"
                :cancel="''"
            >
                <div class="flex flex-col items-center my-4 space-y-6">
                    <div class="show-up flex space-x-4 items-center">
                        <p class="text-xl font-bold">
                            <get-text :context="Lang.CreateTranslationContext('checkout', 'PaymentSuccess')" />
                        </p>
                        <div class="border-2 rounded-md border-green-500 p-1">
                            <check-icon class="w-5 h-5 text-slate-200" />
                        </div>
                    </div>
                    <p class="text-md italic text-center">
                        <get-text :context="Lang.CreateTranslationContext('checkout', 'PaymentSuccessDesc')" />
                    </p>
                </div>
            </form-card>
        </div>
        <div
            v-else
            class="flex w-full min-h-0 h-full justify-evenly"
        >
            <div class="hidden lg:flex flex-col justify-center items-center w-fit h-full p-10">
                <div class="w-fit h-fit max-w-full max-h-full lg:pb-8">
                    <p class="text-2xl font-bold pb-2">
                        <get-text :context="Lang.CreateTranslationContext('checkout', 'Order')" />
                    </p>
                    <badge-card
                        class="show-right flex flex-col w-[50vw] max-h-full min-h-[50vh] h-fit p-2"
                        :hoverable="false"
                    >
                        <div class="flex flex-col grow w-full min-h-0 max-h-full">
                            <div class="flex w-full h-fit text-xl font-semibold">
                                <div class="w-1/2">
                                    <p> <get-text :context="Lang.CreateTranslationContext('checkout', 'Product')" /> </p>
                                </div>
                                <div class="w-1/4">
                                    <p> <get-text :context="Lang.CreateTranslationContext('checkout', 'Quantity')" /> </p>
                                </div>
                                <div class="w-1/4">
                                    <p> <get-text :context="Lang.CreateTranslationContext('checkout', 'Price')" /> </p>
                                </div>
                            </div>
                            <span class="flex w-full h-1 rounded-full bg-slate-600 mt-1" />
                            <div class="flex w-full max-h-full min-h-0 overflow-auto my-2">
                                <div class="flex flex-col w-full h-fit">
                                    <badge-card
                                        v-for="product in products"
                                        :key="product.id"
                                        class="w-full h-fit my-2"
                                        :hoverable="false"
                                    >
                                        <div class="flex w-full">
                                            <div class="flex w-1/2 p-3">
                                                <div class="bg-slate-800 rounded-lg p-1">
                                                    <squares-2-x-2-icon class="w-12 h-12 text-slte-200" />
                                                </div>
                                                <div class="flex flex-col justify-center mx-4 w-fit max-w-full min-w-0">
                                                    <p class="text-xl font-semibold text-slate-50 whitespace-nowrap text-ellipsis overflow-hidden"> {{ product.name }} </p>
                                                    <p class="text-md font-base text-slate-300 whitespace-nowrap text-ellipsis overflow-hidden"> {{ product.app }} </p>
                                                </div>
                                            </div>
                                            <div class="flex w-1/4 p-3 justify-center items-center">
                                                <div class="flex">
                                                    <button
                                                        class="bg-slate-600 rounded-l-md px-1 border-2 border-transparent"
                                                        disabled="true"
                                                    >
                                                        <minus-icon class="w-5 h-5 text-slate-400" />
                                                    </button>
                                                    <p class="text-lg font-semibold text-slate-200 bg-slate-800 px-3">
                                                        {{ product.quantity }}
                                                    </p>
                                                    <button
                                                        class="bg-slate-600 rounded-r-md px-1 border-2 border-transparent"
                                                        disabled="true"
                                                    >
                                                        <plus-icon class="w-5 h-5 text-slate-400" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="flex w-1/4 p-3 justify-center items-center">
                                                <p class="text-lg font-semibold text-slate-200 px-3 py-0.5 rounded-md bg-slate-800"> {{ formatPrice(product.price) }} </p>
                                            </div>
                                        </div>
                                    </badge-card>
                                </div>
                            </div>
                            <div class="flex flex-col grow h-full justify-end">
                                <span class="flex w-full h-1 rounded-full bg-slate-600 mb-2" />
                                <div class="flex justify-end space-x-8">
                                    <div class="flex justify-center items-center">
                                        <p class="text-xl font-bold">Total</p>
                                    </div>
                                    <p class="text-xl font-bold w-1/4 text-center px-3 py-2 rounded-md bg-slate-800">
                                        {{ formatPrice(products.reduce((acc, product) => acc + product.price, 0)) }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </badge-card>
                </div>
            </div>
            <div class="lg:show-left flex flex-col w-fit max-w-full h-full justify-center items-center p-1 lg:p-10">
                <div class="max-w-full max-h-full w-fit h-fit">
                    <p class="hidden lg:flex text-2xl font-bold my-2">
                        <get-text :context="Lang.CreateTranslationContext('checkout', 'Informations')" />
                    </p>
                    <form-card
                        ref="form"
                        class="max-w-full w-fit h-fit p-2"
                        :display-icon="false"
                        :validate="formOpened == 'paymentForm' ? Lang.CreateTranslationContext('verbs', 'Pay') : Lang.CreateTranslationContext('verbs', 'Next')"
                        :on-validate="onFormValidate"
                        :disabled="!formInputsValid && formOpened != 'cartForm'"
                    >
                        <div class="flex flex-col max-w-full w-full max-h-full h-fit bg-slate-800 rounded-md">
                            <div v-show="isMobile">
                                <button
                                    class="flex justify-between p-2 w-full space-x-4"
                                    @click="toggleForm('cartForm')"
                                >
                                    <p class="text-lg font-semibold">
                                        <get-text :context="Lang.CreateTranslationContext('checkout', 'Order')" />
                                    </p>
                                    <div class="flex justify-center items-center">
                                        <chevron-down-icon
                                            ref="cartFormChevron"
                                            class="w-6 h-6 text-slate-200 transition-all"
                                        />
                                    </div>
                                </button>
                                <div
                                    ref="cartForm"
                                    class="overflow-hidden transition-all"
                                    style="max-height: 1000px"
                                >
                                    <div class="p-2 space-y-2">
                                        <badge-card
                                            v-for="product in products"
                                            :key="product.id"
                                            class="w-full h-fit my-2 bg-slate-700"
                                            :hoverable="false"
                                        >
                                            <div class="flex w-full p-3">
                                                <div class="bg-slate-800 rounded-lg p-1">
                                                    <squares-2-x-2-icon class="w-12 h-12 text-slte-200" />
                                                </div>
                                                <div class="flex flex-col justify-center mx-4 w-fit max-w-full min-w-0">
                                                    <p class="text-xl font-semibold text-slate-50 whitespace-nowrap text-ellipsis overflow-hidden"> {{ product.name }} </p>
                                                    <p class="text-md font-base text-slate-300 whitespace-nowrap text-ellipsis overflow-hidden"> {{ product.app }} </p>
                                                </div>
                                            </div>
                                            <div class="flex justify-between items-center w-full px-2">
                                                <div class="flex h-fit">
                                                    <button
                                                        class="bg-slate-600 rounded-l-md px-1 border-2 border-transparent"
                                                        disabled="true"
                                                    >
                                                        <minus-icon class="w-5 h-5 text-slate-400" />
                                                    </button>
                                                    <p class="text-lg font-semibold text-slate-200 bg-slate-800 px-3">
                                                        {{ product.quantity }}
                                                    </p>
                                                    <button
                                                        class="bg-slate-600 rounded-r-md px-1 border-2 border-transparent"
                                                        disabled="true"
                                                    >
                                                        <plus-icon class="w-5 h-5 text-slate-400" />
                                                    </button>
                                                </div>
                                                <div class="flex w-1/4 p-3 justify-center items-center mx-1">
                                                    <p class="text-lg font-semibold text-slate-200 px-3 py-0.5 rounded-md bg-slate-800"> {{ formatPrice(product.price) }} </p>
                                                </div>
                                            </div>
                                        </badge-card>
                                    </div>
                                </div>
                            </div>
                            <div
                                v-show="isMobile"
                                class="px-2"
                            >
                                <span class="flex w-full h-1 bg-slate-700 rounded-md" />
                            </div>
                            <div>
                                <button
                                    class="flex justify-between p-2 w-full space-x-4"
                                    @click="toggleForm('infosForm')"
                                >
                                    <p class="text-lg font-semibold">
                                        <get-text :context="Lang.CreateTranslationContext('checkout', 'PersoInfos')" />
                                    </p>
                                    <div class="flex justify-center items-center">
                                        <chevron-down-icon
                                            ref="infosFormChevron"
                                            class="w-6 h-6 text-slate-200 transition-all"
                                        />
                                    </div>
                                </button>
                                <div
                                    ref="infosForm"
                                    class="overflow-hidden transition-all"
                                    style="max-height: 0px"
                                >
                                    <div class="p-2 space-y-2">
                                        <p class="text-md italic text-slate-400 pb-2">
                                            <get-text :context="Lang.CreateTranslationContext('checkout', 'PersoInfosDesc')" />
                                        </p>
                                        <div>
                                            <input-text
                                                :label="Lang.CreateTranslationContext('checkout', 'Firstname')"
                                                :placeholder="Lang.CreateTranslationContext('checkout', 'Firstname')"
                                                :value="userInfos.firstname"
                                                name="firstname"
                                            />
                                            <input-text
                                                :label="Lang.CreateTranslationContext('checkout', 'Lastname')"
                                                :placeholder="Lang.CreateTranslationContext('checkout', 'Lastname')"
                                                :value="userInfos.lastname"
                                                name="lastname"
                                            />
                                            <input-text
                                                class="pt-2"
                                                :label="Lang.CreateTranslationContext('checkout', 'Address')"
                                                :placeholder="Lang.CreateTranslationContext('checkout', 'Address')"
                                                :value="userInfos.address"
                                                name="address"
                                            />
                                            <input-text
                                                :label="Lang.CreateTranslationContext('checkout', 'City')"
                                                :placeholder="Lang.CreateTranslationContext('checkout', 'City')"
                                                :value="userInfos.city"
                                                name="city"
                                            />
                                            <input-text
                                                :label="Lang.CreateTranslationContext('checkout', 'Zipcode')"
                                                :placeholder="Lang.CreateTranslationContext('checkout', 'Zipcode')"
                                                :value="userInfos.zipcode"
                                                type="number"
                                                name="zipcode"
                                            />
                                            <input-text
                                                class="pt-6"
                                                :label="Lang.CreateTranslationContext('checkout', 'SavePersoInfos')"
                                                :placeholder="Lang.CreateTranslationContext('checkout', 'SavePersoInfos')"
                                                type="checkbox"
                                                orientation="row"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="px-2"> <span class="flex w-full h-1 bg-slate-700 rounded-md" /> </div>
                            <div>
                                <button
                                    class="flex justify-between p-2 w-full space-x-4"
                                    :class="formInputsValid? 'cursor-pointer' : 'cursor-default text-slate-400'"
                                    @click="() => { if (formInputsValid) toggleForm('paymentForm'); }"
                                >
                                    <p class="text-lg font-semibold">
                                        <get-text :context="Lang.CreateTranslationContext('checkout', 'BankInfos')" />
                                    </p>
                                    <div class="flex justify-center items-center">
                                        <chevron-down-icon
                                            ref="paymentFormChevron"
                                            class="w-6 h-6 transition-all"
                                        />
                                    </div>
                                </button>
                                <div
                                    ref="paymentForm"
                                    class="overflow-hidden transition-all"
                                    style="max-height: 0px"
                                >
                                    <div class="p-2 pb-0.5">
                                        <div
                                            id="payment-element"
                                            class="bg-white p-4 rounded-md w-full"
                                            style="margin: 0 0 0.5em 0;"
                                        >
                                            <!--Stripe.js Elements-->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FormCard from '../components/cards/FormCard.vue';
import Lang from '../scripts/Lang';
import User from '../scripts/User';
import 'https://js.stripe.com/v3/';

import {
    Squares2X2Icon,
    CheckIcon,
    PlusIcon,
    MinusIcon,
    ChevronDownIcon
} from '@heroicons/vue/24/outline';
import { Log } from '../scripts/Logs';
import BadgeCard from '../components/cards/BadgeCard.vue';
import InputText from '../components/inputs/InputText.vue';
import IconHeader from '../components/cards/IconHeader.vue';
import GetText from '../components/text/GetText.vue';

const STRIPE_KEY = 'pk_test_51OGgPeCfML9YeK6HdhHbiLr3wwu4kOzo6b9WsD4UgEbvuGcuJQCPnol9JybZZIve8s9bUVs8BOf53fIB1l2tUvin001e2BRoSF';

const products = [
    {
        name: "Kinect support for tracking",
        app: "FullBowody",
        description: "Add Kinect cameras support in FullBowody for better full body tracking.",
        quantity: 1,
        price: 8
    }
];

export default {
    name: "RegisterView",
    components: {
        FormCard,
        Squares2X2Icon,
        CheckIcon,
        BadgeCard,
        PlusIcon,
        MinusIcon,
        ChevronDownIcon,
        InputText,
        IconHeader,
        GetText
    },
    data() {
        return {
            Lang,
            user: User.CurrentUser,
            products,
            stripe: Stripe(STRIPE_KEY),
            elements: null,
            pageType: new URLSearchParams(window.location.search).get("type"),
            isMobile: window.innerWidth < 1024,
            formOpened: 'infosForm',
            forms: ['cartForm', 'infosForm', 'paymentForm'],
            formInputsValid: false,
            userInfos: {
                firstname: '',
                lastname: '',
                address: '',
                city: '',
                zipcode: 0
            }
        };
    },
    mounted() {
        window.addEventListener('resize', () => { this.isMobile = window.innerWidth < 1024; });
        
        if (!this.pageType) {
            this.initialize();
            this.checkStatus();
        }

        const inputs = [this.getInput('lastname'), this.getInput('firstname'), this.getInput('address'), this.getInput('city'), this.getInput('zipcode')];
        inputs.forEach(input => {
            input?.addEventListener('input', (ev) => {
                this.userInfos[input.name] = ev.target.value;
                if (this.isFormValid()) this.formInputsValid = true;
                else this.formInputsValid = false;
            });
        });

        this.openForm(this.isMobile ? 'cartForm' : 'infosForm');
    },
    methods: {
        isFormValid() {
            return (this.getInput('lastname')?.value &&
                this.getInput('firstname')?.value &&
                this.getInput('address')?.value &&
                this.getInput('city')?.value &&
                this.getInput('zipcode')?.value) ? true : false;
        },
        getInput(name) {
            return document.querySelector(`input[name="${name}"]`);
        },
        formatPrice(price) {
            return new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
            }).format(price);
        },
        toggleForm(toOpen) {
            if (this.formOpened == toOpen) {
                return;
            }
            this.openForm(toOpen);
            this.forms.forEach(form => { if (form != toOpen) this.closeForm(form); });
        },
        openForm(toOpen) {
            const formOpen = this.$refs[toOpen];
            if (!formOpen) return;
            const chevronOpen = this.$refs[toOpen + 'Chevron'];
            const formOpenRect = formOpen.firstElementChild.getBoundingClientRect();

            formOpen.style.maxHeight = formOpenRect.height + 'px';
            setTimeout(() => {
                formOpen.style.maxHeight = '800px';
            }, 250);
            chevronOpen.classList.add('rotate-180');

            this.formOpened = toOpen;
        },
        closeForm(toClose) {
            const formClose = this.$refs[toClose];
            if (!formClose) return;
            const formCloseRect = formClose.firstElementChild.getBoundingClientRect();
            const chevronClose = this.$refs[toClose + 'Chevron'];

            formClose.style.maxHeight = formCloseRect.height + 'px';

            setTimeout(() => {
                formClose.style.maxHeight = '0px';
                chevronClose.classList.remove('rotate-180');
            }, 10);
        },
        onFormValidate(form, ev) {
            if (this.formOpened === 'paymentForm') {
                this.handleSubmit(form, ev);
            } else {
                this.toggleForm(this.forms[this.forms.indexOf(this.formOpened) + 1]);
            }
        },
        async initialize() {
            const response = await fetch("http://192.168.1.50:8080/checkout/test", {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });
            const { clientSecret } = await response.json();

            const appearance = {
                theme: 'stripe'
            };
            this.elements = this.stripe.elements({ appearance, clientSecret });

            const paymentElementOptions = {
                layout: "tabs",
            };

            const paymentElement = this.elements.create("payment", paymentElementOptions);
            paymentElement.mount("#payment-element");
        },
        async handleSubmit(form, e) {
            e.preventDefault();
            this.setLoading(true);
            this.showMessage("Paiement en cours ...", Log.INFO);
            const elements = this.elements;

            const { error } = await this.stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: "http://192.168.1.50/checkout?type=success",
                    receipt_email: 'fur.waz06@gmail.com'
                },
            });
            
            if (error.type === "card_error" || error.type === "validation_error") {
                this.showMessage(error.message, Log.ERROR);
            } else {
                this.showMessage("An unexpected error occurred.");
            }

            this.setLoading(false);
        },
        async checkStatus() {
            const clientSecret = new URLSearchParams(window.location.search).get(
                "payment_intent_client_secret"
            );

            if (!clientSecret) {
                return;
            }

            const { paymentIntent } = await this.stripe.retrievePaymentIntent(clientSecret);

            switch (paymentIntent.status) {
            case "succeeded":
                this.showMessage("Payment succeeded!", Log.SUCCESS);
                break;
            case "processing":
                this.showMessage("Your payment is processing.", Log.INFO);
                break;
            case "requires_payment_method":
                this.showMessage("Your payment was not successful, please try again.", Log.WARNING);
                break;
            default:
                this.showMessage("Something went wrong.", Log.ERROR);
                break;
            }
        },
        showMessage(messageText, type) {
            const form = this.$refs.form;
            const log = form.log(messageText, type ?? Log.INFO);
            setTimeout(() => {
                log.delete();
            }, 4000);
        },
        setLoading(isLoading) {
            this.validateBtnDisabled = isLoading;
        }
    }
}
</script>
