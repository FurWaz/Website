<template>
    <div class="flex flex-col grow min-h-full w-full">
        <button-back class="p-2" />
        <icon-header :label="Lang.CreateTranslationContext('admin', 'Admin')" />
        <div class="flex flex-col grow h-full w-full justify-evenly items-center">
            <div class="flex h-fit items-baseline overflow-y-auto px-4 my-auto py-2">
                <div class="flex flex-col md:grid md:grid-cols-2 md:gap-8 md:w-fit md:h-fit justify-center items-center">
                    <button-redirect
                        v-for="(item, index) in links"
                        v-show="!item.condition || item.condition()"
                        :key="item"
                        class="show-right md:m-0 m-2"
                        :style="'animation-delay: '+index+'00ms;'"
                        :href="item.href"
                        :icon="item.icon"
                    >
                        <get-text :context="Lang.CreateTranslationContext('admin', item.name)" />
                    </button-redirect>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { animateShows } from '../scripts/common';
import Lang from '../scripts/Lang';
import IconHeader from '../components/cards/IconHeader.vue';
import ButtonBack from '../components/inputs/ButtonBack.vue';
import ButtonRedirect from '../components/inputs/ButtonRedirect.vue';
import GetText from '../components/text/GetText.vue';

import {
    FolderIcon
} from '@heroicons/vue/24/outline';

const links = [
    {name: "FileExplorer",  icon: FolderIcon, href: "/admin/explorer"}
];

export default {
    name: "MyApps",
    components: {
        IconHeader,
        ButtonBack,
        ButtonRedirect,
        GetText
    },
    data() {
        return {
            Lang,
            links,
            User
        };
    },
    mounted() {
        animateShows(this.$el);
    },
    methods: {
        
    }
}
</script>