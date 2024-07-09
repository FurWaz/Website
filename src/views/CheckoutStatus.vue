<template>
    <div class="flex flex-col grow h-full w-full justify-evenly items-center text-slate-500 dark:text-slate-200">
        <FormCard
            class="p-2 max-w-[30em]"
            cancel=""
            :title="Lang.CreateTranslationContext('checkout', 'Payment')"
            :validate="Lang.CreateTranslationContext('verbs', 'Validate')"
            :disabled="status !== 'succeeded'"
            :on-validate="() => $router.push('/')"
        >
            <div
                class="text-2xl flex flex-col show-up pb-4 items-center"
                style="animation-delay: 400ms;"
            >
                <p
                    class="text-center"
                    :class="success? 'text-green-500': (error? 'text-red-500': 'text-slate-800 dark:text-slate-50')"
                >
                    <GetText :context="title" />
                </p>
                <p class="text-lg text-slate-700 dark:text-slate-200 text-center">
                    <GetText :context="description" />
                </p>
            </div>
        </FormCard>
    </div>
</template>

<script>
import Lang from '../scripts/Lang';
import User from '../scripts/User';

import { API } from '../scripts/API';
import FormCard from '../components/cards/FormCard.vue';
import GetText from '../components/text/GetText.vue';

export default {
    name: "RegisterView",
    components: {
        FormCard,
        GetText
    },
    data() {
        return {
            Lang,
            user: User.CurrentUser,
            status: false
        };
    },
    computed: {
        success() {
            return this.status === 'succeeded';
        },
        pending() {
            return this.status === 'pending';
        },
        error() {
            return this.status === 'error';
        },
        canceled() {
            return this.status === 'canceled';
        },
        title() {
            switch (this.status) {
            case 'succeeded':
                return Lang.CreateTranslationContext('checkout', 'PaymentSuccess');
            case 'pending':
                return Lang.CreateTranslationContext('checkout', 'PaymentPending');
            case 'error':
                return Lang.CreateTranslationContext('checkout', 'PaymentError');
            case 'canceled':
                return Lang.CreateTranslationContext('checkout', 'PaymentCanceled');
            default: return '';
            }
        },
        description() {
            switch (this.status) {
            case 'succeeded':
                return Lang.CreateTranslationContext('checkout', 'PaymentSuccessDesc');
            case 'pending':
                return Lang.CreateTranslationContext('checkout', 'PaymentPendingDesc');
            case 'error':
                return Lang.CreateTranslationContext('checkout', 'PaymentErrorDesc');
            case 'canceled':
                return Lang.CreateTranslationContext('checkout', 'PaymentCanceledDesc');
            default: return '';
            }
        }
    },
    async mounted() {
        const intentId = this.$route.query.payment_intent;
        if (!intentId) {
            this.$router.push('/');
            return;
        }

        this.fetchCheckoutStatus(intentId);
    },
    methods: {
        async fetchCheckoutStatus(intentId) {
            const res = await API.execute_logged(API.ROUTE.CHECKOUT(intentId));
            this.status = res.data;

            if (this.status === 'pending') {
                setTimeout(() => {
                    this.fetchCheckoutStatus(intentId);
                }, 1000);
            }
        }
    }
}
</script>
