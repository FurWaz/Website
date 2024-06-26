<template>
    <div class="flex flex-col grow text-slate-200">
        <div class="flex w-full">
            <div class="w-20">
                <button-back class="px-2 h-fit" />
            </div>
            <div class="show-down flex flex-col w-full justify-center items-center space-y-2 py-2">
                <p class="text-2xl font-bold"> {{ documentName() }} </p>
                <p class="show-down text-base font-semibold"> {{ documentDate() }} </p>
            </div>
            <div class="w-20" />
        </div>
        <div class="flex grow p-2">
            <div class="show-up w-full h-full rounded-md bg-slate-800 px-2 py-1 overflow-scroll">
                <component :is="document()" />
            </div>
        </div>
    </div>
</template>

<script>
import ButtonBack from '../components/inputs/ButtonBack.vue';
import PrivacyDocument from './Legal/Privacy.vue';
import TermsDocument from './Legal/Terms.vue';

export default {
    name: "LegalDocView",
    components: {
        ButtonBack
    },
    data() {
        return {
            type: this.$route.path.split('/').pop(),
            documentName: () => ({
                'privacy': 'Privacy Policy',
                'terms': 'Terms of Service'
            }[this.type]),
            documentDate: () => ({
                'privacy': 'Last updated: 27-11-2023',
                'terms': 'Last updated: 27-11-2023'
            }[this.type]),
            document: () => ({
                'privacy': PrivacyDocument,
                'terms': TermsDocument
            }[this.type])
        };
    },
    mounted() {
        
    },
    methods: {
        
    },
};
</script>
