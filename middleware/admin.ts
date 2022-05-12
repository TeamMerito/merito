export default defineNuxtRouteMiddleware(() => {
    const user = useSupabaseUser();
    const validEmails = ["spadari.nicola@gmail.com", "benji98.bm@gmail.com", "alessiolibardi@gmail.com"];

    if (!user.value) {
        return navigateTo("/login");
    }
    if (!validEmails.includes(user.value.user_metadata.email)) {
        return navigateTo("/login");
    }
});
