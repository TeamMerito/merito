import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
    modules: ["@nuxtjs/supabase", "nuxt-windicss"],
	css: ["virtual:windi.css"],
    supabase: {
        client: {
            persistSession: true
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
