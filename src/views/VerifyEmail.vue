<template>
    <div class="mx-auto text-center py-16 space-y-4 text-white">
        <form-card
            class="p-2 text-xl"
            :title="Lang.CreateTranslationContext('verifications', 'emailTitle')"
            :disabled="error"
            :on-cancel="goHome"
            :on-validate="goHome"
        >
            <div class="pb-4">
                <div v-if="error">
                    <p class="text-red-500">
                        <get-text :context="Lang.CreateTranslationContext('verifications', 'emailError', {error})" />
                    </p>
                </div>
                <div v-else-if="success">
                    <p class="text-green-500">
                        <get-text :context="Lang.CreateTranslationContext('verifications', 'emailSuccess')" />
                    </p>
                </div>
                <div v-else>
                    <p class="text-slate-500">
                        <get-text :context="Lang.CreateTranslationContext('verifications', 'emailLoading')" />
                    </p>
                </div>
            </div>
        </form-card>
    </div>
</template>

<script>
import FormCard from '../components/cards/FormCard.vue';
import GetText from '../components/text/GetText.vue';
import API from '../scripts/API';
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
        fetch('http://localhost:8080/test', {
            mode: 'cors',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'authorization': 'Bearer owo'
            }
        });
    },
    methods: {
        async verifyEmail() {
            const token = this.$route.query.token;
            if (!token) {
                this.error = 'No token provided';
                return;
            }

            try {
                await API.execute(API.ROUTE.VERIFY.EMAIL(), API.METHOD.POST, { token });
                this.success = true;
            } catch (err) {
                this.error = err.error;
            }
        },
        goHome() {
            this.$router.push('/');
        }
    }
}
</script>
