import { defineNuxtConfig } from "nuxt";
import transformerDirective from "@unocss/transformer-directives";

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
        attributify: true,
        shortcuts: [
            ["btn", "whitespace-nowrap items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium"]
        ],
        theme: {
            colors: {
                accent: "#FB8500"
            },
            animation: {
                "spin-slow": "spin 3s linear infinite"
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
                heading: {
                    name: "Montserrat",
                    weights: ["400", "700"]
                },
                sans: {
                    name: "DM Sans",
                    weights: ["400", "700"]
                }
            }
        },
        transformers: [
            transformerDirective()
        ]
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
