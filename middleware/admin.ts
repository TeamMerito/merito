export default defineNuxtRouteMiddleware(() => {
    const user = useSupabaseUser();

    const isAdmin = user.value && (user.value.email === "spadari.nicola@gmail.com" || user.value.email === "alessiolibardi@gmail.com" || user.value.email === "benjaminarski@gmail.com");

    if (!isAdmin) {
        return navigateTo("/private");
    }
});
