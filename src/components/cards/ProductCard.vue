<template>
    <div class="flex flex-col md:flex-row p-4 rounded-lg bg-slate-200 dark:bg-slate-600 md:space-x-4">
        <div class="flex justify-center items-center lg:w-1/2">
            <div class="mr-4">
                <div class="bg-white dark:bg-slate-800 rounded-lg p-1 h-fit m-auto">
                    <squares-2-x-2-icon class="w-12 h-12 text-slte-200" />
                </div>
            </div>
            <div class="flex flex-col grow">
                <p class="text-slate-700 dark:text-white text-lg font-semibold"> {{ product.name }} </p>
                <p class="text-slate-500 dark:text-slate-300 line-clamp-2"> {{ product.description }} </p>
            </div>
        </div>
        <div class="flex md:flex-col lg:flex-row grow md:w-1/2 pt-4 md:pt-0 justify-between min-w-fit">
            <div class="flex items-center justify-center lg:w-1/2 min-w-fit pr-2">
                <div class="flex rounded-md">
                    <button
                        class="flex items-center justify-center w-8 h-8 rounded-l-md bg-slate-300 dark:bg-slate-500 text-slate-800 dark:text-white hover:bg-slate-400 hover:text-black hover:dark:bg-slate-400 hover:dark:text-white"
                        @click="decreaseQuantity($event, product)"
                    >
                        <minus-icon class="w-4 h-4" />
                    </button>
                    <input
                        class="w-12 h-8 text-center bg-white dark:bg-slate-800 text-slate-700 dark:text-white"
                        disabled="true"
                        name="quantity"
                        :value="product.quantity"
                    >
                    <button
                        class="flex items-center justify-center w-8 h-8 rounded-r-md bg-slate-300 dark:bg-slate-500 text-slate-800 dark:text-white hover:bg-slate-400 hover:text-black hover:dark:bg-slate-400 hover:dark:text-white"
                        @click="increaseQuantity($event, product)"
                    >
                        <plus-icon class="w-4 h-4" />
                    </button>
                </div>
            </div>
            <div class="flex items-center justify-center lg:w-1/2 min-w-fit pl-2">
                <input
                    class="w-24 h-8 text-center bg-white dark:bg-slate-800 text-slate-700 dark:text-white rounded-md"
                    disabled="true"
                    name="quantity"
                    :value="formatPrice(product.price)"
                >
            </div>
        </div>
    </div>
</template>

<script>
import {
    Squares2X2Icon,
    PlusIcon,
    MinusIcon
} from '@heroicons/vue/24/outline';

export default {
    name: 'ProductCard',
    components: {
        Squares2X2Icon,
        PlusIcon,
        MinusIcon
    },
    props: {
        product: {
            type: Object,
            default: () => {},
            required: true
        }
    },
    methods: {
        async increaseQuantity(ev, product) {
            if (ev.target.disabled) return;
            ev.target.disabled = true;

            try {
                const res = await API.execute_logged(API.ROUTE.CARTPRODUCTS(product.id), API.METHOD.PATCH, { quantity: product.quantity + 1 });
                product.quantity = res.data.quantity;
            } catch (err) { console.error(err); }

            ev.target.disabled = false;
        },
        async decreaseQuantity(ev, product) {
            if (ev.target.disabled) return;
            ev.target.disabled = true;

            try {
                if (product.quantity <= 1) {
                    await API.execute_logged(API.ROUTE.CARTPRODUCTS(product.id), API.METHOD.DELETE);
                    this.products = this.products.filter(p => p.id !== product.id);
                } else {
                    const res = await API.execute_logged(API.ROUTE.CARTPRODUCTS(product.id), API.METHOD.PATCH, { quantity: product.quantity - 1 });
                    product.quantity = res.data.quantity;
                }
            } catch (err) { console.error(err); }

            ev.target.disabled = false;
        },
        formatPrice(price) {
            return new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
            }).format(price);
        }
    }
}
</script>
