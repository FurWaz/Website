<template>
    <div class="flex flex-col grow h-full w-full justify-evenly items-center text-slate-500 dark:text-slate-200">
        <icon-header
            class="flex pb-2"
            :show-icon="!isMobile"
            :label="Lang.CreateTranslationContext('checkout', 'Payment')"
        />
        <div class="flex grow items-center justify-center min-w-0 max-w-full min-h-0 max-h-full p-2 md:p-4">
            <badge-card
                v-show="isMobile && formOpened === 'cartForm'"
                :hoverable="false"
            >
                <div class="flex grow p-4 min-w-0 max-w-full min-h-0 max-h-full">
                    <div class="flex flex-col space-y-2">
                        <p class="text-xl font-semibold">
                            <get-text :context="Lang.CreateTranslationContext('checkout', 'Cart')" />
                        </p>
                        <div class="flex flex-col grow space-y-4 overflow-auto max-h-full min-h-0 py-4">
                            <product-card
                                v-for="product in products"
                                :key="product.id"
                                class="show-up"
                                :product="product"
                            />
                            <div
                                v-if="products === null"
                                class="flex flex-col justify-center items-center h-full"
                            >
                                <p class="text-lg font-semibold text-center text-slate-700 dark:text-white">
                                    <get-text :context="Lang.CreateTranslationContext('checkout', 'LoadingProducts')" />
                                </p>
                                <p class="text-md font-semibold text-center text-slate-500 dark:text-slate-300">
                                    <get-text :context="Lang.CreateTranslationContext('checkout', 'LoadingProductsDesc')" />
                                </p>
                            </div>
                            <div
                                v-else-if="products.length === 0"
                                class="flex flex-col justify-center items-center h-full"
                            >
                                <p class="text-lg font-semibold text-center text-slate-700 dark:text-white">
                                    <get-text :context="Lang.CreateTranslationContext('checkout', 'NoProducts')" />
                                </p>
                                <p class="text-md font-semibold text-center text-slate-500 dark:text-slate-300">
                                    <get-text :context="Lang.CreateTranslationContext('checkout', 'NoProductsDesc')" />
                                </p>
                            </div>
                        </div>
                        <div class="flex flex-col h-fit">
                            <span class="flex w-full h-1 rounded-full bg-slate-200 dark:bg-slate-600" />
                            <div class="flex pt-2 justify-end">
                                <div class="flex justify-center items-center mx-4">
                                    <p class="text-xl font-semibold">
                                        <get-text :context="Lang.CreateTranslationContext('checkout', 'Total')" />
                                    </p>
                                </div>
                                <div class="flex justify-center items-center">
                                    <input
                                        class="w-24 h-10 text-xl font-semibold text-center bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-white rounded-md"
                                        disabled="true"
                                        :value="formatPrice(products?.reduce((acc, cur) => acc + cur.price * cur.quantity, 0))"
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <span class="flex w-full h-1 bg-slate-200 dark:bg-slate-600" />
                <div class="flex w-full justify-end p-3 rounded-lg">
                    <div class="flex justify-between w-full h-fit">
                        <button-text :onclick="() => $router.go(-1)">
                            <get-text :context="Lang.CreateTranslationContext('verbs', 'Cancel')" />
                        </button-text>
                        <button-block
                            :onclick="() => formOpened = 'infosForm'"
                            :disabled="!products?.length"
                        >
                            <get-text :context="Lang.CreateTranslationContext('verbs', 'Continue')" />
                        </button-block>
                    </div>
                </div>
            </badge-card>

            <badge-card
                v-show="!isMobile || formOpened !== 'cartForm'"
                class="flex w-fit h-fit max-w-full min-w-0 max-h-full min-h-0"
                :hoverable="false"
            >
                <div class="flex min-w-0 max-w-full min-h-0 max-h-full">
                    <div class="hidden sm:flex grow p-4 min-w-0 max-w-full min-h-0 max-h-full">
                        <div class="flex flex-col space-y-2">
                            <p class="text-xl font-semibold">
                                <get-text :context="Lang.CreateTranslationContext('checkout', 'Cart')" />
                            </p>
                            <div class="flex flex-col grow space-y-4 overflow-auto max-h-full min-h-0 p-4">
                                <product-card
                                    v-for="product in products"
                                    :key="product.id"
                                    :product="product"
                                />
                                <div
                                    v-if="products === null"
                                    class="flex flex-col justify-center items-center h-full"
                                >
                                    <p class="text-lg font-semibold text-center text-slate-700 dark:text-white">
                                        <get-text :context="Lang.CreateTranslationContext('checkout', 'LoadingProducts')" />
                                    </p>
                                    <p class="text-md font-semibold text-center text-slate-500 dark:text-slate-300">
                                        <get-text :context="Lang.CreateTranslationContext('checkout', 'LoadingProductsDesc')" />
                                    </p>
                                </div>
                                <div
                                    v-else-if="products.length === 0"
                                    class="flex flex-col justify-center items-center h-full"
                                >
                                    <p class="text-lg font-semibold text-center text-slate-700 dark:text-white">
                                        <get-text :context="Lang.CreateTranslationContext('checkout', 'NoProducts')" />
                                    </p>
                                    <p class="text-md font-semibold text-center text-slate-500 dark:text-slate-300">
                                        <get-text :context="Lang.CreateTranslationContext('checkout', 'NoProductsDesc')" />
                                    </p>
                                </div>
                            </div>
                            <div class="flex flex-col h-fit">
                                <span class="flex w-full h-1 rounded-full bg-slate-200 dark:bg-slate-600" />
                                <div class="flex pt-2 justify-end">
                                    <div class="flex justify-center items-center mx-4">
                                        <p class="text-xl font-semibold">
                                            <get-text :context="Lang.CreateTranslationContext('checkout', 'Total')" />
                                        </p>
                                    </div>
                                    <div class="flex justify-center items-center">
                                        <input
                                            class="w-24 h-10 text-xl font-semibold text-center bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-white rounded-md"
                                            disabled="true"
                                            :value="formatPrice(products?.reduce((acc, cur) => acc + cur.price * cur.quantity, 0))"
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col w-fit bg-slate-200 dark:bg-slate-600 p-2 md:p-4">
                        <div class="flex flex-col space-y-2 grow min-h-0 max-h-full">
                            <p class="text-xl font-semibold">
                                <get-text :context="Lang.CreateTranslationContext('checkout', 'Informations')" />
                            </p>
                            <div class="flex flex-col grow space-y-4 justify-between min-h-0 max-h-full">
                                <div class="flex flex-col bg-slate-50 dark:bg-slate-700 rounded-lg max-h-full min-h-0 overflow-auto">
                                    <div
                                        v-show="formOpened === 'infosForm'"
                                        class="flex flex-col p-3"
                                    >
                                        <input-text
                                            name="firstname"
                                            :label="Lang.CreateTranslationContext('checkout', 'Firstname')"
                                            :placeholder="Lang.CreateTranslationContext('checkout', 'Firstname')"
                                        />
                                        <input-text
                                            name="lastname"
                                            :label="Lang.CreateTranslationContext('checkout', 'Lastname')"
                                            :placeholder="Lang.CreateTranslationContext('checkout', 'Lastname')"
                                        />
                                        <input-text
                                            name="address"
                                            :label="Lang.CreateTranslationContext('checkout', 'Address')"
                                            :placeholder="Lang.CreateTranslationContext('checkout', 'Address')"
                                        />
                                        <input-text
                                            name="city"
                                            :label="Lang.CreateTranslationContext('checkout', 'City')"
                                            :placeholder="Lang.CreateTranslationContext('checkout', 'City')"
                                        />
                                        <input-text
                                            name="zipcode"
                                            :label="Lang.CreateTranslationContext('checkout', 'Zipcode')"
                                            :placeholder="Lang.CreateTranslationContext('checkout', 'Zipcode')"
                                        />
                                        <input-text
                                            name="saveInfos"
                                            type="checkbox"
                                            :label="Lang.CreateTranslationContext('checkout', 'SavePersoInfos')"
                                            :placeholder="Lang.CreateTranslationContext('checkout', 'SavePersoInfos')"
                                        />
                                        <a
                                            class="italic hover:underline text-slate-500 dark:text-slate-400"
                                            href="/privacy"
                                            target="_blank"
                                        >
                                            <get-text :context="Lang.CreateTranslationContext('checkout', 'CheckPrivacyPolicy')" />
                                        </a>
                                    </div>
                                    <div
                                        v-show="formOpened === 'paymentForm'"
                                        id="payment-element"
                                        class="bg-white p-2"
                                    >
                                        <!-- Stripe content -->
                                    </div>
                                </div>
                                <div class="flex flex-col justify-end bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                                    <log-zone ref="log-zone" />
                                    <div class="flex justify-between w-full h-fit">
                                        <button-text :onclick="() => { (isMobile || formOpened === 'paymentForm')? formOpened = forms[forms.indexOf(formOpened)-1]: $router.go(-1) }">
                                            <get-text :context="Lang.CreateTranslationContext('verbs', 'Cancel')" />
                                        </button-text>
                                        <button-block
                                            :onclick="() => { formOpened === 'infosForm' ? openPaymentForm(): handleSubmit() }"
                                            :disabled="formInputsValid || !products?.length"
                                        >
                                            <get-text :context="Lang.CreateTranslationContext('verbs', 'Continue')" />
                                        </button-block>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </badge-card>
        </div>
    </div>
</template>

<script>
import { Log } from '../scripts/Logs';
import Lang from '../scripts/Lang';
import User from '../scripts/User';
import 'https://js.stripe.com/v3/';
import API from '../scripts/API';

import BadgeCard from '../components/cards/BadgeCard.vue';
import IconHeader from '../components/cards/IconHeader.vue';
import GetText from '../components/text/GetText.vue';
import Ressources from '../scripts/Ressources';
import InputText from '../components/inputs/InputText.vue';
import ButtonBlock from '../components/inputs/ButtonBlock.vue';
import ButtonText from '../components/inputs/ButtonText.vue';
import ProductCard from '../components/cards/ProductCard.vue';
import LogZone from '../components/cards/LogZone.vue';

export default {
    name: "RegisterView",
    components: {
        BadgeCard,
        IconHeader,
        GetText,
        InputText,
        ButtonBlock,
        ButtonText,
        ProductCard,
        LogZone
    },
    data() {
        return {
            Lang,
            user: User.CurrentUser,
            products: null,
            stripe: Stripe(import.meta.env.VITE_STRIPE_KEY),
            elements: null,
            pageType: new URLSearchParams(window.location.search).get("type"),
            isMobile: window.innerWidth < 768,
            formOpened: window.innerWidth < 768? 'cartForm': 'infosForm',
            forms: ['cartForm', 'infosForm', 'paymentForm'],
            userInfos: {
                firstname: '',
                lastname: '',
                address: '',
                city: '',
                zipcode: 0,
                saveInfos: false
            },
            initialized: false
        };
    },
    watch: {
        formOpened() {
            if (this.formOpened === 'infosForm') {
                this.fetchProfile();
            }
        }
    },
    async mounted() {
        await this.fetchCartProducts();

        const inputs = ["firstname", "lastname", "address", "city", "zipcode", "saveInfos"];
        for (const input of inputs) {
            this.$el.querySelector(`input[name="${input}"]`).addEventListener('input', (e) => {
                this.userInfos[input] = e.target.type === 'checkbox'? e.target.checked: e.target.value;
            });
        }

        await this.fetchProfile();
    },
    methods: {
        async fetchCartProducts() {
            this.products = [];
            const { products } = (await API.execute_logged(API.ROUTE.CARTS(), API.METHOD.GET)).data;
            for (const p of products) {
                const product = await Ressources.getProduct(p.productId);
                const app = await Ressources.getApp(product.app);
                const element = {
                    id: p.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    quantity: p.quantity,
                    app: app.name,
                };
                this.products.push(element);
            }
        },
        async fetchProfile() {
            const profile = await API.execute_logged(API.ROUTE.PROFILE());
            if (!profile) return;

            const { firstname, lastname, address, city, zipcode } = profile.data;
            this.userInfos = { firstname, lastname, address, city, zipcode, saveInfos: true };

            const inputs = ["firstname", "lastname", "address", "city", "zipcode", "saveInfos"];
            for (const input of inputs) {
                const el = this.$el.querySelector(`input[name="${input}"]`);
                if (!el) continue;
                if (el.type === 'checkbox') el.checked = this.userInfos[input];
                else el.value = this.userInfos[input];
            }
        },
        formatPrice(price) {
            return new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
            }).format(price);
        },
        async openPaymentForm() {
            if (!Object.values(this.userInfos).every(v => {
                if (v !== '' && v !== 0) return true;
                Lang.GetText(Lang.CreateTranslationContext('checkout', 'PersoInfosDesc'), text => {
                    const log = this.$refs['log-zone'].log(text, Log.WARNING);
                    setTimeout(() => { log.delete(); }, 2000);
                });
                return false;
            })) return;

            await this.initialize();
            this.formOpened = 'paymentForm';
        },
        async initialize() {
            if (this.initialized) return;
            this.initialized = true;

            const { clientSecret } = (await API.execute_logged(API.ROUTE.CHECKOUT(), API.METHOD.POST, this.userInfos)).data;

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
        async handleSubmit() {
            const logZone = this.$refs['log-zone'];
            const log = logZone.log(await Lang.GetTextAsync(Lang.CreateTranslationContext('verbs', 'Paying')), Log.INFO);

            const elements = this.elements;
            const { error } = await this.stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: window.location.origin + "/checkout/status",
                    receipt_email: 'fur.waz06@gmail.com'
                },
            });
            
            if (error.type === "card_error" || error.type === "validation_error") {
                log.update(error.message, Log.ERROR);
            }

            setTimeout(() => { log.delete() }, 2000);
        }
    }
}
</script>
