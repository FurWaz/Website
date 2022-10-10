<template>
    <div class="fixed top-0 left-0 h-0 w-0 pointer-events-none opacity-0 transition-all">
        <div class="flex flex-col justify-center w-screen h-screen bg-black/[0.3] back-blur" v-on:click="this.callCancel()">
            <div ref="modal-container" class="w-fit h-fit mx-auto transition-all" style="transform: scale(0.9)">
                <div class="flex flex-col w-fit h-fit w-[20vw] h-[20vh] rounded-lg shadow-xl border-2 border-slate-600 bg-slate-700">
                    <div class="flex grow-0 justify-center bg-slate-600">
                        <h2 class="text-xl font-bold text-slate-200 m-0 px-4 py-1"> {{ this.title }} </h2>
                    </div>
                    <div class="flex grow p-2 justify-left">
                        <p class="text-lg text-slate-300 m-0"> {{ this.content }} </p>
                    </div>
                    <span class="flex grow-0 h-1 rounded-lg bg-slate-600 mx-2"></span>
                    <div class="flex grow-0 py-2 px-2 justify-between">
                        <button-text ref="btn-cancel" :action="this.callCancel"> Cancel </button-text>
                        <button-block ref="btn-confirm" :action="this.callConfirm"> Confirm </button-block>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ButtonBlock from '../buttons/ButtonBlock.vue';
import ButtonText from '../buttons/ButtonText.vue';



function callConfirm() {
    this.hide();
    if (this.onValidate) this.onValidate();
}

function callCancel() {
    this.hide();
    if (this.onValidate) this.onCancel();
}

export default {
  components: { ButtonText },
    name: "Modal",
    props: {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        onValidate: {
            type: Function,
            required: false,
            default: () => {}
        },
        onCancel: {
            type: Function,
            required: false,
            default: () => {}
        }
    },
    components: {
        ButtonBlock,
        ButtonText
    },
    data() { return {} },
    methods: { callConfirm, callCancel },
    mounted() {
        this.show = () => {
            const el = this.$el;
            el.style.pointerEvents = "all";
            el.style.opacity = "1";
            /** @type {HTMLDivElement} */
            const container = this.$refs["modal-container"];
            container.style.transform = "scale(1)";
        }
        this.hide = () => {
            /** @type {HTMLDivElement} */
            const el = this.$el;
            el.style.pointerEvents = "none";
            el.style.opacity = "0";
            const container = this.$refs["modal-container"];
            container.style.transform = "scale(0.9)";
        }
    }
}
</script>