<template>
    <div class="flex flex-col spawn-up rounded-lg border-2 border-slate-600 shadow-xl overflow-hidden">
        <div class="flex flex-row justify-between w-full h-fit py-1 bg-slate-600 space-x-6 px-2">
            <p class="text-white text-lg font-extrabold"> {{ this.title }} </p>
        </div>
        <div ref="inputs" class="flex flex-col w-full h-fit px-4 py-6 space-y-6">
            <slot></slot>
        </div>
        <div class="flex grow-0 overflow-hidden h-0 transition-all" ref="logs">
            <p class="text-white text-center w-full h-fit min-w-fit font-semibold"></p>
        </div>
        <span class="bg-slate-600 w-[90%] mx-auto h-1 rounded-lg"></span>
        <div class="flex flex-row justify-between w-full h-fit py-2 space-x-6 px-2">
            <button-text :action="() => { goBack() }"> Cancel </button-text>
            <button-block ref="validate-btn" :action="validate"> {{ this.validateLabel }} </button-block>
        </div>
    </div>
</template>

<script>
import ButtonBlock from "../buttons/ButtonBlock.vue";
import ButtonText from "../buttons/ButtonText.vue";
import { redirectHome } from "../../scripts/common.js";

let logMessage = msg => {};
let logTimeoutID = -1;

/**
 * @param {HTMLElement} el
 */
function findInputs(el) {
    if (!el.tagName) return [];
    if (el.tagName.toLowerCase() === "input")
        return [ el ];
    const list = [];
    for (const child of el.children)
        findInputs(child).forEach(input => list.push(input));
    return list;
}

function validate(obj) {
    const oldtext = obj.getText();
    obj.setText(" ... ");
    const inputs = findInputs(this.$refs["inputs"]);
    let data = inputs;
    data.getInput = (name) => { return inputs.find(input => input.name === name); };
    for (const input of inputs)
        data[input.name] = input.value.trim();
    const res = this.onvalidate(data, logMessage);
    if (res.then != undefined) {
        res.finally(() => {
            obj.setText(oldtext);
        }).catch(console.error);
    }
    else obj.setText(oldtext);
}

export default {
    name: "Popup",
    props: {
        onvalidate: {
            type: Function,
            default: () => {},
            required: false
        },
        title: {
            type: String,
            default: "Form",
            required: false
        },
        validateLabel: {
            type: String,
            default: "Validate",
            required: false
        }
    },
    components: {
        ButtonBlock,
        ButtonText
    },
    methods: {
        goBack() { redirectHome(false); },
        validate
    },
    mounted() {
        logMessage = (msg) => {
            /**@type {HTMLDivElement} */
            const logs = this.$refs["logs"];
            logs.firstElementChild.innerHTML = msg;
            logs.style.height = logs.firstElementChild.getBoundingClientRect().height+"px";
            if (logTimeoutID != -1) clearTimeout(logTimeoutID);
            logTimeoutID = setTimeout(() => {
                logs.style.height = "0px";
                logTimeoutID = -1;
            }, 5000);
        };

        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape") this.back();
            if (e.key === "Enter") this.validate(this.$refs["validate-btn"]);
        });
    }
};
</script>