<template>
    <a ref="btn" class="relative flex m-2 transition-all">
        <div class="flex grow rounded-lg p-3 border-2 dark:border-slate-700 border-slate-400 text-slate-500
                    dark:hover:bg-slate-600 hover:bg-slate-400 hover:text-slate-50 dark:hover:border-orange-500 hover:border-orange-500 cursor-pointer transition-all">
            <div class="flex flex-col justify-center mx-auto">
                <arrow-left-icon class="w-8 h-8"></arrow-left-icon>
            </div>
        </div>
        
        <div ref="label" class="absolute -right-4 flex grow h-full w-0 flex-col justify-center transition-all pointer-events-none" style="opacity: 0;">
            <div class="w-fit h-fit dark:bg-slate-700 bg-slate-300 px-4 rounded-lg border-2 dark:border-slate-600 border-slate-400">
                <p class="text-lg font-bold dark:text-slate-50 text-slate-700 p-0 m-0"> {{ Lang.CurrentLang.Back }} </p>
            </div>
        </div>
    </a>
</template>

<script>
import Lang from "../../scripts/Lang";
import {
    ArrowLeftIcon
} from "@heroicons/vue/24/outline";

function setup(obj) {
    const btn = obj.$refs.btn;
    const label = obj.$refs.label;
    
    btn.addEventListener("mouseenter", ev => {
        label.style.transform = "scale(1, 1)";
        label.style.opacity = "1";
    });
    btn.addEventListener("mouseleave", ev => {
        label.style.transform = "scale(0.9, 0.8)";
        label.style.opacity = "0";
    });

    obj.click = (ev) => {
        window.history.length > 1? obj.$router.go(-1) : obj.$router.push("/");
        setTimeout(() => {
            window.app.sidebar.update();
        }, 10);
        ev?.preventDefault();
    };
    btn.addEventListener("click", ev => obj.click(ev));

    obj.update = () => {
        const shouldShow = window.location.pathname !== "/";
        btn.classList[shouldShow? "remove" : "add"]("opacity-0", "pointer-events-none");
    };
    window.app.sidebar.addButton(obj);
    obj.update();
}

export default {
    name: "Backbtn",
    methods: {},
    components: {
        ArrowLeftIcon
    },
    props: {},
    data() { return { Lang }; },
    setup() {  },
    mounted() {
        this.id = "back";
        setup(this);
    }
}
</script>