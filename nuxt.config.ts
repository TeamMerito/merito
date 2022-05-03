import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
    modules: ["@vueuse/nuxt", "@nuxtjs/supabase", "@unocss/nuxt"],
    supabase: {
        client: {
            persistSession: true
        }
    },
    unocss: {
        wind: true,
        icons: true,
        preflight: true,
        shortcuts: [
            ["btn", "whitespace-nowrap items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium"],
            ["box", "container mx-auto"]
        ],
        theme: {
            colors: {
                accent: "#FB8500"
            },
            breakpoints: {
                sm: "576px",
                md: "768px",
                lg: "992px",
                xl: "1200px",
                xxl: "1400px",
                ultrawide: "2000px"
            }
        },
        webFonts: {
            fonts: {
                heading: "Montserrat",
                sans: "Inter"
            }
        }
    },
    meta: {
        title: "Merito",
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { name: "theme-color", content: "#ffffff" },
            { name: "format-detection", content: "no" }
        ],
        link: [
            { rel: "shortcut-icon", href: "/favicon.png" }
        ],
        htmlAttrs: {
            lang: "en"
        }
    },
    runtimeConfig: {
        public: {
            redirectUrl: process.env.SUPABASE_REDIRECT
        }
    }
});
