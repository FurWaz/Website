<template>
    <div>
        <div class="flex flex-col grow justify-evenly items-center">
            <div class="show-down flex flex-col h-fit w-full">
                <FwIcon class="w-28 h-28 m-auto" />
                <div>
                    <h1 class="text-center"> {{ $t('portal.name') }} </h1>
                </div>
            </div>

            <div class="show-up p-4 flex flex-col h-fit w-fit justify-center items-start space-y-4 card">
                <div>
                    <h2>
                        {{ $t('portal.connectTo') }}
                        <span class="text-primary"> {{ appName ?? '- - - - - -' }} </span>
                        {{ $t('portal.connectWith') }}
                        <span class="text-primary"> {{ User.Current?.pseudo ?? '- - - - -' }} </span>
                        .
                    </h2>
                </div>
                <!-- <div>
                    <p>{{ $t('portal.appAccess.title') }}</p>
                    <div>
                        <ul>
                            <li v-for="scope in scopes" :key="scope">- {{ $t('portal.appAccess.' + scope) }}</li>
                        </ul>
                    </div>
                </div> -->
                <div class="flex w-full h-fit pt-4">
                    <UButton variant="link" color="gray" :to="{ name: 'login', query: { redirect: encodeURI($route.fullPath) } }" >
                        {{ $t('portal.connectWithOther') }}
                    </UButton>
                </div>
                <UAlert
                    v-show="logError" @close="logError = null" :title="logError ?? ''"
                    variant="subtle" color="red" class="show-down" icon="i-heroicons-exclamation-triangle"
                    :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'red', variant: 'ghost', padded: false }"
                />
                <div class="flex w-full h-fit justify-between items-center">
                    <UButton variant="ghost" @click="$router.back()">
                        {{ $t('verb.cancel') }}
                    </UButton>
                    <UButton icon="i-heroicons-chevron-right" trailing variant="solid" @click="authorize" :loading="continueLoading" :disabled="continueDisabled || (logError != null)">
                        {{ $t('verb.continue') }}
                    </UButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const header = useHeader();
const router = useRouter();
const route = useRoute();
const { t } = useI18n();

useSeoMeta({
    title: `FurWaz - ${t('portal.title')}`,
    description: `${t('portal.description')}`,
    ogTitle: `FurWaz - ${t('portal.title')}`,
    ogDescription: `${t('portal.description')}`,
    ogImage: '/icon.png',
    ogUrl: 'https://furwaz.com' + route.fullPath
});
header.setTitle(t('portal.name'));

const logError = ref<string | null>(null);
const appName = ref<string | null>(null);
const continueLoading = ref(false);

// const scopes = ref<string[]|undefined>((route.query.scope as string)?.split(' '));
// const client_id = ref<string|undefined>(route.query.client_id as string);
// const state = ref<string|undefined>(route.query.state as string);
const redirect = ref<string|undefined>(route.query.redirect as string);
const token = ref<string|undefined>(route.query.token as string);

const continueDisabled = ref(false);
// const { data, error } = await useFetch('/', {
//     method: 'GET',
//     // body: JSON.stringify({ client_id: client_id.value, state: state.value, scopes: scopes.value })
// });
if (token.value) {
    const res = await API.Request(ROUTES.PORTAL.APP.GET(token.value));
    if (res.error) {
        logError.value = res.message;
        continueDisabled.value = true;
    } else {
        const data = res.data;
        appName.value = data.app.name;
    }
} else {
    logError.value = 'Token is missing';
}

// function authorize() {
//     continueLoading.value = true;
//     setTimeout(() => {
//         continueLoading.value = false;
//         logError.value = 'Not implemented yet';
//         setTimeout(() => { logError.value = null; }, 4000);
//     }, 500);
// }

async function authorize() {
    if (!token.value || logError.value) return;

    continueLoading.value = true;
    const res = await API.RequestLogged(ROUTES.PORTAL.CONNECT(token.value));
    continueLoading.value = false;
    if (res.error) {
        logError.value = res.message;
        setTimeout(() => { logError.value = null; }, 4000);
        return;
    }

    if (redirect.value) {
        window.location.href = redirect.value + (redirect.value.indexOf('?') === -1 ? '?' : '&') + `token=${token.value}`;
    } else {
        router.push('/');
    }
}

// watch([client_id, state, scopes], () => {
//     continueDisabled.value = !client_id.value || !state.value || !scopes.value ||
//                              !scopes.value.length || (error.value !== undefined);
//     logError.value = (!client_id.value)? 'client_id is missing' :
//                      (!state.value)? 'state is missing' :
//                      (!scopes.value || !scopes.value.length)? 'scopes are missing' :
//                      (error.value)? 'Failed to fetch data : '+error.value : null;
// });
</script>
