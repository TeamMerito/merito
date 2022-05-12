export const useAuth = () => {
    const runtimeConfig = useRuntimeConfig();
    const router = useRouter();
    const { auth } = useSupabaseClient();

    const userLogin = async (provider: Provider) => {
        const { error } = await auth.signIn({
            provider
        }, {
            redirectTo: runtimeConfig.public.redirectUrl
        });

        if (error) {
            console.error("Something went wrong during login:", error);
            return { error: true, message: error.message };
        }

        router.push("/profile");

        return { error: false, message: "success" };
    };

    const userUpdate = async (newData: Object) => {
        const { error } = await auth.update(newData);

        if (error) {
            console.error("Something went wrong during user update:", error);
            return { error: true, message: error.message };
        }

        return { error: false, message: "success" };
    };

    const userLogout = async () => {
        const { error } = await auth.signOut();

        if (error) {
            console.error("Something went wrong during logout:", error);
            return { error: true, message: error.message };
        }

        return { error: false, message: "success" };
    };

    return {
        userLogin,
        userUpdate,
        userLogout
    };
};
