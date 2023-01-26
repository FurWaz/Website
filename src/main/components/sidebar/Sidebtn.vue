<template>
    <a ref="btn" class="relative flex m-2" :href="href">
        <div :class="' bg-'+bg+' '" class="flex grow rounded-lg p-3 border-2 border-slate-700
                    hover:bg-slate-600 hover:text-slate-50 hover:border-orange-500 cursor-pointer transition-all">
            <div class="flex flex-col justify-center mx-auto">
                <component :is="icon" class="w-8 h-8"></component>
            </div>
        </div>
        
        <div ref="label" class="absolute -right-4 flex grow h-full w-0 flex-col justify-center transition-all pointer-events-none" style="opacity: 0">
            <div class="w-fit h-fit bg-slate-700 px-4 rounded-lg border-2 border-slate-600">
                <p class="text-lg font-bold text-slate-50 p-0 m-0"> {{ name }} </p>
            </div>
        </div>
    </a>
</template>

<script>
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

    btn.addEventListener("click", ev => {
        obj.$router.push(obj.href).then(() => {
            window.app.sidebar.update();
        });
        ev.preventDefault();
    });

    obj.update = () => {
        const isButtonURL = window.location.pathname === obj.href;
        btn.classList.add(isButtonURL? "text-orange-500" : "text-slate-500");
        btn.classList.remove(isButtonURL? "text-slate-500" : "text-orange-500");
    };
    window.app.sidebar.addButton(obj);
    obj.update();
}

export default {
    name: "Sidebtn",
    methods: {},
    components: {},
    props: {
        name: {
            type: String,
            default: "",
            required: false
        },
        icon: {
            required: true
        },
        bg: {
            type: String,
            default: "slate-700",
            required: false
        },
        href: {
            type: String,
            default: "#",
            required: false
        }
    },
    data() { return {}; },
    setup() {  },
    mounted() {
        setup(this);
    }
}
</script>