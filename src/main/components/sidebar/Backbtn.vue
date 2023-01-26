<template>
    <a ref="btn" class="relative flex m-2 transition-all">
        <div :class="' bg-'+bg+' '" class="flex grow rounded-lg p-3 border-2 border-slate-700 text-slate-500
                    hover:bg-slate-600 hover:text-slate-50 hover:border-orange-500 cursor-pointer transition-all">
            <div class="flex flex-col justify-center mx-auto">
                <arrow-left-icon class="w-8 h-8"></arrow-left-icon>
            </div>
        </div>
        
        <div ref="label" class="absolute -right-4 flex grow h-full w-0 flex-col justify-center transition-all pointer-events-none" style="opacity: 0;">
            <div class="w-fit h-fit bg-slate-700 px-4 rounded-lg border-2 border-slate-600">
                <p class="text-lg font-bold text-slate-50 p-0 m-0"> Back </p>
            </div>
        </div>
    </a>
</template>

<script>
import {
    ArrowLeftIcon
} from "@heroicons/vue/24/outline";

function setup(obj) {
    const btn = obj.$refs.btn;
    const label = obj.$refs.label;

    if (btn.name === "")
        label.classList.add("hidden");
    
    btn.addEventListener("mouseenter", ev => {
        label.style.transform = "scale(1, 1)";
        label.style.opacity = "1";
    });
    btn.addEventListener("mouseleave", ev => {
        label.style.transform = "scale(0.9, 0.8)";
        label.style.opacity = "0";
    });

    btn.addEventListener("click", ev => {
        window.history.length > 1? obj.$router.go(-1) : obj.$router.push("/");
        setTimeout(() => {
            window.app.sidebar.update();
        }, 10);
        ev.preventDefault();
    });

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
    data() { return {}; },
    setup() {  },
    mounted() {
        setup(this);
    }
}
</script>