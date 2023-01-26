<template>
    <div class="flex flex-col grow">
        <fb-title :displayBackBtn="false"> Track your body with two or more basic cameras </fb-title>
        <div class="flex md:flex-row flex-wrap wrap justify-center h-fit m-4 pt-4">
            <div
                v-for="short in shortcuts"
                class="show-up flex rounded-lg border-2 border-slate-600 m-4 overflow-hidden shadow-xl max-w-min"
            >
                <div class="flex grow flex-col w-min p-4 max-w-full">
                    <div class="flex flex-row max-w-full md:space-x-4">
                        <svg v-html="short.icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="md:flex hidden text-transparent fill-blue-500 w-10 h-10 mr-4"></svg>
                        <div class="flex flex-col justify-center max-w-full">
                            <h2 class="text-slate-200 text-2xl font-semibold overflow-hidden text-ellipsis whitespace-nowrap"> {{ short.label }} </h2>
                        </div>
                    </div>
                    <div class="flex grow my-4">
                        <p class="text-slate-400 text-xl font-semibold"> {{ short.description }} </p>
                    </div>
                    <div class="flex flex-col grow justify-end">
                        <div class="flex grow-0 flex-row md:justify-end justify-start">
                            <button-block :href="short.link"> {{ short.button }} </button-block>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import ButtonBlock from '../../main/components/buttons/ButtonBlock.vue';
import FbTitle from '../components/FbTitle.vue';

const shortcuts = [
    {
        label: "GitHub",
        description: "See the GitHub organization for FullBowody",
        button: "See on GitHub",
        link: "https://github.com/FullBowody",
        icon: `<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z"></path>`
    },
    {
        label: "Documentation",
        description: "Read the documentation to understand how FullBowody works",
        button: "Read the docs",
        link: "/apps/fullbowody/docs",
        icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />`
    },
    {
        label: "Addons",
        description: "Check out all available addons for FullBowody",
        button: "Go to Addons",
        link: "/apps/fullbowody/addons",
        icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />`
    }
]


export default {
    name: "Home",
    components: {
        ButtonBlock,
        FbTitle
    },
    methods: {},
    data() { return { shortcuts }; },
    setup() {},
    mounted() {
        
    }
};
</script>

<style>

</style>