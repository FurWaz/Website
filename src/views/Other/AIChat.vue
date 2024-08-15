<template>
    <div class="flex flex-col w-full h-full justify-center items-center min-w-0 max-w-full m-auto min-h-0 max-h-full">
        <div class="flex w-full h-fit justify-center items-center">
            <p class="show-up text-4xl font-bold py-4">FurWaz AI Chat</p>
        </div>
        <div ref="container" class="flex grow w-full h-full overflow-auto min-h-0 max-h-full min-w-0 max-w-full">
            <div class="flex flex-col w-full h-fit space-y-4 px-2">

                <div v-for="(message, index) in messages" :key="index" class="flex flex-col min-w-0 max-w-[95%] show-up rounded-lg p-2 border-2 space-y-2"
                    :class="message.left ?
                        'mr-auto border-slate-300 dark:border-slate-600 bg-slate-50/[0.5] dark:bg-slate-800/[0.5]' :
                        'ml-auto border-orange-300 dark:border-orange-500 bg-orange-400/[0.2] dark:bg-orange-500/[0.2]'">
                    <div class="flex p-1 rounded-lg w-fit" :class="message.left ? 'bg-slate-400/[0.2] dark:bg-slate-500/[0.2]' : 'bg-orange-400/[0.2] dark:bg-orange-400/[0.1]'">
                        <div>
                            <BoltIcon v-if="message.left" class="w-6 h-6" />
                            <UserIcon v-else class="w-6 h-6" />
                        </div>
                        <p class="text-lg px-2">
                            <GetText :context="message.author" />
                        </p>
                    </div>
                    <div class="flex min-w-0 max-w-full min-h-0 h-full overflow-auto">
                        <div v-html="processMessageContent(message.content)" />
                    </div>
                </div>

            </div>
        </div>
        <div class="show-up flex w-full h-fit p-2 space-x-2">
            <div class="flex w-full h-fit">
                <input type="text" :placeholder="strPlaceholder" class="border-2 border-slate-300 dark:border-slate-500 rounded-lg p-2 bg-slate-50 dark:bg-slate-500/[0.2] w-full min-w-0 focus:outline-none focus:border-orange-500 transition duration-200">
            </div>
            <div class="flex w-fit h-fit">
                <button @click="sendMessage" class="border-2 border-slate-300 dark:border-slate-500 rounded-lg p-2 bg-slate-50 dark:bg-slate-500/[0.2]">
                    <PaperAirplaneIcon class="w-6 h-6" />
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import MarkdownIt from 'markdown-it';
import katex from 'markdown-it-katex';
import highlightjs from 'markdown-it-highlightjs';

const md = new MarkdownIt();
md.use(katex);
md.use(highlightjs);

import {
    PaperAirplaneIcon,
    UserIcon,
    BoltIcon
} from '@heroicons/vue/24/outline';
import Lang from '@/scripts/Lang';
import GetText from '@/components/text/GetText.vue';

export default {
    name: 'AI',
    components: {
        PaperAirplaneIcon,
        UserIcon,
        BoltIcon,
        GetText
    },
    data() {
        return {
            session: null,
            input: null,
            strPlaceholder: '',
            messages: []
        }
    },
    mounted() {
        window.ai.createTextSession().then(session => {
            this.session = session;
            window.session = this.session;
        });

        this.input = document.querySelector('input');
        this.input.addEventListener('keydown', e => {
            if (e.key === 'Enter') this.sendMessage();
        });
        this.input.focus();

    Lang.GetText(Lang.CreateTranslationContext('aichat', 'EnterMessage'), text => this.strPlaceholder = text);
    },
    methods: {
        scrollBottom() {
            setTimeout(() => {
                this.$refs.container.scrollTo({
                    top: this.$refs.container.scrollHeight,
                    behavior: 'smooth'
                });
            }, 20);
        },
        sendMessage() {
            if (!this.session) return;

            const message = this.input.value;
            if (!message || !message.trim()) return;
            this.input.value = '';

            this.messages.push({
                content: message,
                author: Lang.CreateTranslationContext('aichat', 'User'),
                left: false,
                writing: false
            });
            this.scrollBottom();

            const stream = this.session.promptStreaming(message);
            const reader = stream.getReader();
            this.consumeReader(reader);
        },
        consumeReader(reader, messageHolder = null) {
            if (!messageHolder) {
                messageHolder = {
                    content: '',
                    author: Lang.CreateTranslationContext('aichat', 'AI'),
                    left: true,
                    writing: true
                };
                this.messages.push(messageHolder);
                this.scrollBottom();
            }

            reader.read().then(({ done, value }) => {
                if (done) {
                    messageHolder.writing = false;
                    if (messageHolder.content.trim() === '') {
                        this.messages.pop();
                    }
                    return;
                }
                messageHolder.content = value;
                this.$forceUpdate();
                this.consumeReader(reader, messageHolder);
                this.scrollBottom();
            }).catch(err => {
                messageHolder.content = '```Error: ' + err + '```';
                this.$forceUpdate();
                console.error(err);
            });
        },
        processMessageContent(content) {
            return md.render(content);
            // return content.replace(/(?:\r\n|\r|\n)/g, '<br>');
        }
    }
}
</script>

<style>
@import url('./atom-one-dark.css');
@import url('./atom-one-light.css');

::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}
</style>