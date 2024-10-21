<template>
    <div class="abolute show-up">
        <div
            class="absolute rounded-lg bg-slate-50 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 shadow-lg p-1 -translate-x-1/2 -translate-y-[180%]"
        >
            <p class="text-md font-semibold text-center w-max">
                <GetText :context="value" />
            </p>
        </div>
    </div>
</template>

<script>
import GetText from "../text/GetText.vue"

export default {
    name: 'NameCard',
    components: { GetText },
    props: {
        value: {
            type: [String, Object],
            required: true
        },
        target: {
            type: [String, Object],
            required: true
        }
    },
    watch: {
        target() {
            this.stickToTarget();
        }
    },
    mounted() {
        this.stickToTarget();
    },
    methods: {
        stickToTarget() {
            if (this.target) {
                const element = typeof(this.target) === 'string' ? document.querySelector(this.target) : this.target;
                if (!element) return console.error('NameCard: target ', this.target, ' not found');

                element.appendChild(this.$el);
                element.addEventListener('mouseenter', this.handleMouseEnter);
                element.addEventListener('mouseleave', this.handleMouseLeave);

                const rect = element.getBoundingClientRect();
                this.$el.style.display = 'none';
                this.$el.style.marginLeft = `${rect.width / 2}px`;
            }
        },
        handleMouseEnter() {
            this.$el.style.display = 'block';
        },
        handleMouseLeave() {
            this.$el.style.display = 'none';
        }
    }
}
</script>
