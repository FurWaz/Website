<template>
    <div class="flex flex-col h-fit w-full grow">
        <div class="flex flex-col w-full md:h-[45.5em] h-fit md:pt-[13.25em] pt-0 px-[10%] items-end space-y-4">
            <div class="flex space-x-4">
                <span
                    class="show-left flex grow-0 h-2 w-10 bg-prim-4"
                    style="animation-delay: 400ms;"
                />
                <span
                    class="show-left flex grow-0 h-2 w-10 bg-prim-3"
                    style="animation-delay: 300ms;"
                />
                <span
                    class="show-left flex grow-0 h-2 w-10 bg-prim-2"
                    style="animation-delay: 200ms;"
                />
                <span
                    class="show-left flex grow-0 h-2 w-10 bg-prim-1"
                    style="animation-delay: 100ms;"
                />
            </div>
            <div
                class="show-left flex flex-col items-center w-full h-fit p-4 space-y-8"
                style="animation-delay: 400ms;"
            >
                <title-text>
                    {{ lang.MyApps() }}
                </title-text>
                <base-text class="text-right">
                    {{ lang.MyAppsDesc() }}
                </base-text>

                <div class="flex justify-evenly w-[50%]">
                    <!-- Fullbowody -->
                    <svg-text class="w-12 rotate-[-10deg]">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                        />
                    </svg-text>
                    <!-- Converter -->
                    <svg-text class="w-12 rotate-[20deg]">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                        />
                    </svg-text>
                    <!-- Vybeen -->
                    <svg-text class="w-12 rotate-[10deg]">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
                        />
                    </svg-text>
                </div>

                <button-block
                    class="ml-auto"
                    href="/apps"
                >
                    {{ lang.MyAppsBtn() }}
                </button-block>
            </div>
        </div>
    </div>
</template>

<script>
import TitleText from '../text/TitleText.vue';
import BaseText from '../text/BaseText.vue';
import SvgText from '../text/SvgText.vue';
import ButtonBlock from '../inputs/ButtonBlock.vue';
import Lang from '../../scripts/Lang'

export default {
    name: "HomeApps",
    components: {
        TitleText,
        BaseText,
        SvgText,
        ButtonBlock,
    },
    data() {
        return {
            lang: Lang.CurrentLang
        }
    },
    mounted() {
        Lang.AddCallback(lang => this.lang = lang);
    }
}
</script>