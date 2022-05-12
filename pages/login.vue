<template>
    <NuxtLayout name="contained">
        <Head>
            <Title>Login</Title>
        </Head>

        <div class="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
            <div class="max-w-lg mx-auto text-center">
                <h1 class="font-heading text-2xl font-bold sm:text-3xl">
                    Login
                </h1>

                <p class="mt-4 text-gray-500">
                    Join Merito with your favorite account. Choose your platform and start rating.
                </p>
            </div>

            <div class="max-w-md mx-auto mt-8 mb-0 space-y-4">
                <div class="flex justify-center items-center space-x-4">
                    <SocialButton icon="i-fa-brands-google" @clicked="login('google')">
                        Google
                    </SocialButton>
                    <SocialButton icon="i-fa-brands-facebook-f" @clicked="login('facebook')">
                        Facebook
                    </SocialButton>
                    <SocialButton icon="i-fa-brands-twitter" @clicked="login('twitter')">
                        Twitter
                    </SocialButton>
                    <SocialButton icon="i-fa-brands-spotify" @clicked="login('spotify')">
                        Spotify
                    </SocialButton>
                    <SocialButton icon="i-fa-brands-github" @clicked="login('github')">
                        GitHub
                    </SocialButton>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
    const { userLogin } = useAuth();

    const login = async (provider: Provider) => {
        const { error, message } = await userLogin(provider);

        if (error) {
            console.error(`Can't sign in: ${message}`);
        }
    };
</script>
