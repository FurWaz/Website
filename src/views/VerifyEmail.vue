<template>
    <div class="flex grow justify-center items-center">
        <FormCard
            class="p-2 text-xl"
            cancel=""
            :title="Lang.CreateTranslationContext('verifications', 'emailTitle')"
            :disabled="error !== null"
            :on-validate="goHome"
        >
            <div
                class="show-up pb-4"
                style="animation-delay: 400ms;"
            >
                <div v-if="error">
                    <p class="text-red-500">
                        <GetText :context="Lang.CreateTranslationContext('verifications', 'emailError', {error})" />
                    </p>
                </div>
                <div v-else-if="success">
                    <p class="text-green-500">
                        <GetText :context="Lang.CreateTranslationContext('verifications', 'emailSuccess')" />
                    </p>
                </div>
                <div v-else>
                    <p class="text-slate-500">
                        <GetText :context="Lang.CreateTranslationContext('verifications', 'emailLoading')" />
                    </p>
                </div>
            </div>
        </FormCard>
    </div>
</template>

<script>
import FormCard from '../components/cards/FormCard.vue';
import GetText from '../components/text/GetText.vue';
import { API } from '../scripts/API';
import ROUTES from '../scripts/routes';
import Lang from '../scripts/Lang';

export default {
    name: 'VerifyEmail',
    components: {
        FormCard,
        GetText
    },
    data() {
        return {
            Lang,
            error: null,
            success: false
        }
    },
    mounted() {
        this.verifyEmail();
    },
    methods: {
        async verifyEmail() {
            const token = this.$route.query.token;
            if (!token) {
                this.error = 'No token provided';
                return;
            }

            const res = await API.Request(ROUTES.VERIFY.EMAIL(token));
            if (res.error) {
                this.error = res.error;
            } else {
                this.success = true;
            }
        },
        goHome() {
            this.$router.push('/');
        }
    }
}
</script>
