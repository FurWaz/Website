export function redirect(fallback: string) {
    const query = new URLSearchParams(window.location.search);
    const redirect = query.get('redirect') ?? query.get('redirect_uri') ?? fallback;

    const { $router } = useNuxtApp();
    $router.push(redirect);
}