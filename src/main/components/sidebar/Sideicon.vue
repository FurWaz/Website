<template>
    <div ref="btn" class="relative flex">
        <div class="flex grow p-1 m-2 rounded-lg border-2 dark:bg-slate-600 bg-slate-300 dark:border-slate-700 border-slate-400
                    hover:shadow-xl dark:hover:border-orange-500 hover:border-orange-500 hover:bg-slate-400 dark:text-slate-50 text-slate-700 hover:text-slate-50 cursor-pointer transition-all">
            <div class="icon flex flex-col justify-center mx-auto transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 250 250" stroke-width="14" stroke="currentColor" class="h-12">
                    <path d="M-45,34"/>
                    <path d="M144,52"/>
                    <path d="M198,196"/>
                    <path d="M36,70"/>
                    <path d="M135,178"/>
                    <path d="M270,106"/>
                    <g>
                        <polygon points="54,142 98.9,178.1 116.9,196 135,196 153,178.1 198,142.1 189,124 198,70 189,52 153,88 99,88 63,52 
                            54,70 63,124 	"/>
                        <g>
                            <path fill="currentColor" d="M54,142.1l44.9,9c0,0,0,0,0,0l18,44.9c0,0,0,0,0,0l-17.9-17.9c0,0,0,0,0,0L54,142.1
                                C54,142.1,54,142.1,54,142.1z"/>
                            <path fill="currentColor" d="M198,142.1l-45,9c0,0,0,0,0,0L135,196c0,0,0,0.1,0,0l17.9-17.9c0,0,0,0,0,0L198,142.1
                                C198,142.1,198,142.1,198,142.1z"/>
                        </g>
                    </g>
                </svg>
            </div>
        </div>
        
        <div ref="label" class="absolute -right-4 flex grow h-full w-0 flex-col justify-center transition-all opacity-0 pointer-events-none">
            <div class="w-fit h-fit dark:bg-slate-700 bg-slate-300 px-4 rounded-lg border-2 dark:border-slate-600 border-slate-400">
                <p class="text-lg font-bold dark:text-slate-50 text-slate-700 p-0 m-0"> {{ name }} </p>
            </div>
        </div>
    </div>
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
        btn.firstElementChild.classList.add(isButtonURL? "border-orange-500" : "border-slate-500");
        btn.firstElementChild.classList.add(isButtonURL? "dark:border-orange-500" : "dark:border-slate-500");
        btn.firstElementChild.classList.remove(isButtonURL? "border-slate-500" : "border-orange-500");
        btn.firstElementChild.classList.remove(isButtonURL? "dark:border-slate-500" : "dark:border-orange-500");
    };
    window.app.sidebar.addButton(obj);
    obj.update();
}

export default {
    name: "Sideicon",
    methods: {},
    components: {},
    props: {
        name: {
            type: String,
            required: true
        },
        href: {
            type: String,
            default: "#",
            required: false
        }
    },
    data() { return {}; },
    setup() {},
    mounted() {
        setup(this);
    }
}
</script>