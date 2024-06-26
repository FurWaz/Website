<template>
    <div class="flex flex-col grow h-full w-full justify-evenly items-center">
        <div class="flex w-full max-w-[25em] h-full flex-col justify-evenly items-center">
            <form-card
                title="Store"
                class="p-2 mx-1"
                :on-validate="connect"
                :on-cancel="close"
                :validate="error ? '' : Lang.CreateTranslationContext('verbs', 'Add')"
            >
                <div
                    v-show="!error"
                    class="show-up space-y-2 md:space-y-6 p-2 pt-0"
                >
                    <div class="space-y-2">
                        <p class="text-xl text-slate-600 dark:text-slate-200 w-fit">
                            <get-text :context="Lang.CreateTranslationContext('buy', 'AddToCart')" />
                        </p>
                        <badge-card
                            v-if="product"
                            :hoverable="false"
                            class="p-2 px-4 space-y-4"
                        >
                            <div class="flex">
                                <div class="bg-slate-200 dark:bg-slate-800 rounded-lg p-1 h-fit m-auto">
                                    <squares-2-x-2-icon class="w-12 h-12 text-slte-200" />
                                </div>
                                <div class="flex flex-col justify-center mx-4 w-fit max-w-[16em] min-w-0 pb-1">
                                    <p class="text-xl font-semibold text-slate-700 dark:text-slate-50 whitespace-nowrap text-ellipsis overflow-hidden"> {{ product.name }} </p>
                                    <p class="text-md font-base text-slate-500 dark:text-slate-300 line-clamp-2"> {{ product.description }} </p>
                                </div>
                            </div>
                        </badge-card>
                        <p class="md:pt-4 text-xl text-slate-600 dark:text-slate-200 w-fit">
                            <get-text :context="Lang.CreateTranslationContext('buy', 'FromApp')" />
                        </p>
                        <badge-card
                            v-if="app"
                            :hoverable="false"
                            class="p-2 space-y-4"
                        >
                            <div
                                class="flex flex-col items-center"
                            >
                                <div class="flex items-center space-x-2">
                                    <title-text> {{ app.name }} </title-text>
                                    <div
                                        id="product-check"
                                    >
                                        <check-badge-icon
                                            class="w-6 h-6"
                                            :class="app.verified? 'text-green-500': 'text-slate-400'"
                                        />
                                    </div>
                                    <name-card
                                        :value="app.verified? Lang.CreateTranslationContext('portal', 'AppVerified'): Lang.CreateTranslationContext('portal', 'AppNotVerified')"
                                        target="#product-check"
                                    />
                                </div>
                                <base-text class="w-fit mx-auto text-center"> {{ app.description }} </base-text>
                            </div>
                            <base-text class="flex space-x-1 w-full text-sm">
                                <get-text :context="Lang.CreateTranslationContext('portal', 'CreatedBy')" />
                                <span class="font-bold">{{ author?.pseudo ?? '...' }}</span>
                            </base-text>
                        </badge-card>
                    </div>
                    <div class="show-right">
                        <p class="flex text-xl text-slate-600 dark:text-slate-200 w-full space-x-2">
                            <get-text :context="Lang.CreateTranslationContext('buy', 'ToAccount')" />
                            <span class="font-bold"> {{ user.pseudo }} </span>
                        </p>
                    </div>
                </div>
                <div
                    v-show="error"
                    style="animation-delay: 600ms;"
                >
                    <p
                        class="show-up text-xl text-center font-bold italic text-slate-600 dark:text-slate-200"
                        style="animation-delay: 400ms;"
                    >
                        <get-text :context="Lang.CreateTranslationContext('notfound', 'Woops')" />
                    </p>
                    <p
                        class="show-up text-xl text-center font-semibold italic text-slate-400 dark:text-slate-400"
                        style="animation-delay: 400ms;"
                    >
                        <get-text :context="Lang.CreateTranslationContext('portal', 'PortalError', {error: errorMessage})" />
                    </p>
                </div>
                <log-zone ref="log-zone" />
            </form-card>
        </div>
    </div>
</template>

<script>
import LogZone from '../components/cards/LogZone.vue';
import GetText from '../components/text/GetText.vue';
import BadgeCard from '../components/cards/BadgeCard.vue';
import TitleText from '../components/text/TitleText.vue';
import BaseText from '../components/text/BaseText.vue';
import FormCard from '../components/cards/FormCard.vue';
import API from '../scripts/API';
import Lang from '../scripts/Lang';
import { Log } from '../scripts/Logs';
import User from '../scripts/User';
import Ressources from '../scripts/Ressources';

import {
    CheckBadgeIcon,
    Squares2X2Icon
} from '@heroicons/vue/24/outline';
import NameCard from '../components/cards/NameCard.vue';

export default {
    name: "RegisterView",
    components: {
        LogZone,
        GetText,
        CheckBadgeIcon,
        Squares2X2Icon,
        BadgeCard,
        TitleText,
        BaseText,
        FormCard,
        NameCard
    },
    data() {
        return {
            Lang,
            user: User.CurrentUser,
            error: false,
            errorMessage: "",
            token: null,
            product: undefined,
            app: undefined,
            author: undefined,
            mode: 'useAccount'
        };
    },
    mounted() {
        this.token = this.$route.query.token;
        if (!this.token) this.error = true;

        this.retreiveBuyInfos();
    },
    methods: {
        goToLogin() {
            this.$router.push({
                name: 'Login',
                query: {
                    link: this.$route.fullPath
                }
            });
        },
        async retreiveBuyInfos() {
            try {
                const res = await API.execute_logged(API.ROUTE.BUY(this.token, 'infos'), API.METHOD.GET);
                const productId = res.data.productId;
                this.product = await Ressources.getProduct(productId);
                if (!this.product) throw new Error("Product not found");
                this.app = await Ressources.getApp(this.product.app);
                if (!this.app) throw new Error("App not found");
                this.author = await Ressources.getUser(this.app.authorId);
            } catch (err) {
                console.error(err);
                this.error = true;
                this.errorMessage = err.error ?? err.message;
            }
        },
        async connect(form) {            
            const log = form.log(await Lang.GetTextAsync(Lang.CreateTranslationContext('verbs', 'Adding')));

            try {
                const res = await API.execute_logged(API.ROUTE.BUY(this.token), API.METHOD.POST);
                log.update(res.message, Log.SUCCESS);
                setTimeout(() => {
                    this.close();
                }, 1000);
            } catch (err) {
                console.error(err);
                log.update(err.error, Log.ERROR);
                setTimeout(() => {
                    log.delete();
                }, 4000);
            }
        },
        change(form) {
            form.$el.classList.remove("show-up");
            form.$el.classList.add("hide-down");
            setTimeout(() => {
                this.user = null;
                this.$forceUpdate();
                form.$el.classList.remove("hide-down");
                form.$el.classList.add("show-up");
            }, 200)
        },
        close() {
            const redirect = this.$route.query.redirect;
            if (!redirect) {
                window.close();
                this.$router.push("/");
            } else {
                window.location.href = (
                    redirect.includes("?")
                        ? redirect + "&"
                        : redirect + "?"
                ) + "token=" + this.token;
            }
        }
    }
}
</script>