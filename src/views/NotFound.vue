<template>
    <div class="flex flex-col grow h-full w-full justify-evenly items-center">
        <div class="flex flex-col justify-center items-center">
            <icon-card class="h-40 w-40" />
            <h1
                class="show-up text-4xl font-bold text-slate-700 dark:text-white"
                style="animation-delay: 400ms;"
            >
                <GetText :context="Lang.CreateTranslationContext('notfound', 'Woops')" />
            </h1>
            <p
                class="show-up text-2xl font-bold text-slate-600 dark:text-slate-200"
                style="animation-delay: 500ms;"
            >
                <GetText :context="Lang.CreateTranslationContext('notfound', 'NotFound')" />
            </p>
        </div>
        <ButtonBlock
            class="show-up"
            style="animation-delay: 600ms;"
            :onclick="() => $router.go(-1)"
        >
            <GetText :context="Lang.CreateTranslationContext('common', 'Back')" />
        </ButtonBlock>
        <div class="opacity-50">
            <p
                class="show-up text-xl italic font-semibold text-slate-700 dark:text-slate-200"
                style="animation-delay: 800ms;"
            >
                <GetText :context="Lang.CreateTranslationContext('notfound', 'WhereAmI')" /> 🤔
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IconCard from "../components/cards/IconCard.vue";
import ButtonBlock from '../components/inputs/ButtonBlock.vue';
import GetText from '../components/text/GetText.vue';
import Lang from '../scripts/Lang';

export default defineComponent({
    name: "NotFound",
    components: {
        IconCard,
        ButtonBlock,
        GetText
    },
    data() {
        return { Lang };
    },
    mounted() {}
});
</script>