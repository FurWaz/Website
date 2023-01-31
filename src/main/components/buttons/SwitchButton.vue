<template>
    <div class="flex justify-between space-x-20">
        <div ref="label" class="flex flex-col justify-center">
            <p class="text-lg font-semibold text-slate-300"> {{ label }} </p>
        </div>
        <div class="flex flex-col justify-center">
            <div ref="btn" class="flex rounded-2xl bg-slate-800 border-2 border-slate-500 w-10 h-fit cursor-pointer transition-all">
                <div class="flex bg-slate-200 rounded-2xl h-5 w-5 translate-x-0 transition-all"></div>
            </div>
        </div>
    </div>
</template>

<script>

function setup(obj) {
    const btn = obj.$refs["btn"];
    const dot = btn.firstElementChild;

    if (obj.label === undefined || obj.label === "")
        obj.$refs["label"].classList.add("hidden");

    btn.addEventListener("click", () => {
        if (dot.classList.contains("translate-x-0")) {
            dot.classList.remove("translate-x-0");
            dot.classList.add("translate-x-4");
            btn.classList.remove("bg-slate-800");
            btn.classList.add("bg-orange-500");
        } else {
            dot.classList.remove("translate-x-4");
            dot.classList.add("translate-x-0");
            btn.classList.remove("bg-orange-500");
            btn.classList.add("bg-slate-800");
        }
    });
}

export default {
    name: 'SwitchButton',
    data() { return {} },
    components: {},
    methods: {},
    props: {
        label: {
            type: String,
            default: "",
            required: false
        }
    },
    mounted() {
        setup(this);
    }
}
</script>