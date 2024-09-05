<template>
    <div class="flex flex-col grow h-full w-full">
        <button-back class="px-2 h-fit" />
        <div class="flex flex-col grow justify-center items-center space-y-2">
            <FormCard
                class="show-up p-2"
                :display-icon="true"
                :title="Lang.CreateTranslationContext('account', 'PasswordModification')"
                :validate="Lang.CreateTranslationContext('verbs', 'Edit')"
                :cancel="''"
                :disabled="true"
                :on-validate="changePassword"
            >
                <InputText
                    ref="password"
                    :label="Lang.CreateTranslationContext('account', 'OldPassword')"
                    class="show-down"
                    style="animation-delay: 100ms;"
                />
                <InputText
                    ref="confirmation"
                    :label="Lang.CreateTranslationContext('account', 'NewPassword')"
                    class="show-down"
                    style="animation-delay: 200ms;"
                />
                <InputText
                    ref="confirmation"
                    :label="Lang.CreateTranslationContext('account', 'Confirmation')"
                    class="show-down"
                    style="animation-delay: 300ms;"
                />
            </FormCard>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormCard from '../../components/cards/FormCard.vue';
import ButtonBack from '../../components/inputs/ButtonBack.vue';
import InputText from '../../components/inputs/InputText.vue';
import Lang from '../../scripts/Lang';
import User from '../../scripts/User';

export default defineComponent({
    name: "MySecurity",
    components: {
        InputText,
        FormCard,
        ButtonBack,
    },
    data() {
        return {
            Lang,
            User
        };
    },
    mounted() { },
    methods: {
        // async changePassword(form: any) {
        //    TODO : Change password
        // }
    }
});
</script>