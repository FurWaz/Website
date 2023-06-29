<template>
    <div class="flex flex-col h-fit w-full md:pt-0 pt-40 grow">
        <div class="flex flex-col w-full md:h-[48em] h-fit md:pt-[13.25em] pt-0 px-[10%] items-end space-y-4">
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
                    <get-text :context="{file: 'home', code: 'MyAbout'}" />
                </title-text>
                <base-text class="text-right">
                    <get-text :context="{file: 'home', code: 'MyAboutDesc'}" />
                </base-text>

                <button-block
                    class="ml-auto"
                    href="/about"
                >
                    <get-text :context="{file: 'home', code: 'MyAboutBtn'}" />
                </button-block>
            </div>
        </div>
    </div>
</template>

<script>
import TitleText from '../text/TitleText.vue';
import BaseText from '../text/BaseText.vue';
import ButtonBlock from '../inputs/ButtonBlock.vue';
import GetText from '../text/GetText.vue';

export default {
    name: "HomeAbout",
    components: {
        TitleText,
        BaseText,
        ButtonBlock,
        GetText,
    },
    data() {
        return {}
    },
    mounted() {
        
    }
}
</script>