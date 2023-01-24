<template>
    <div ref="button" class="flex flex-col justify-center mx-2 text-blue-50 border-2 border-blue-500 rounded-md
               hover:text-blue-500 hover:bg-blue-50 hover:border-blue-50 transition-all">
        <p class="text-lg font-bold whitespace-nowrap cursor-pointer px-2">
            {{ name }}
        </p>
        <div class="fixed w-0 h-0 overflow-visible">
            <div class="relative h-fit mt-4 pt-2 -translate-x-2">
                <div style="max-height: 0px;" class="submenu relative flex flex-col w-fit bg-blue-50 rounded-lg shadow-xl overflow-hidden transition-all">
                    <div class="flex flex-col h-fit w-fit p-2 space-y-2">
                        <slot></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
function setup(btn) {
    const submenu = btn.querySelector(".submenu");
    const content = submenu.firstElementChild;
    const parent = submenu.parentElement;

    parent.style.width = btn.getBoundingClientRect().width + "px";
    btn.addEventListener("mouseenter", () => {
        submenu.style.maxHeight = content.getBoundingClientRect().height + "px";
        submenu.classList.remove("hide-up");
        submenu.classList.add("show-down");
    });
    btn.addEventListener("mouseleave", () => {
        submenu.style.maxHeight = "0px";
        submenu.classList.remove("show-down");
        submenu.classList.add("hide-up");
    });
}

export default {
    name: "TopCateg",
    methods: {},
    props: {
        name: {
            type: String,
            default: undefined,
            required: true
        }
    },
    setup() {},
    data() { return {}; },
    mounted() {
        setup(this.$refs["button"]);
    }
}
</script>