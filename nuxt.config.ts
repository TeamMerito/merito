import { defineNuxtConfig } from "nuxt";
import transformerDirectives from "@unocss/transformer-directives";
import transformerVariantGroup from "@unocss/transformer-variant-group";

export default defineNuxtConfig({
    modules: ["@vueuse/nuxt", "@nuxtjs/supabase", "@unocss/nuxt"],
    supabase: {
        client: {
            persistSession: true
        }
    },
    unocss: {
        uno: true,
        preflight: true,
        attributify: true,
        icons: true,
        typography: true,
        shortcuts: [
            ["btn-accent", "whitespace-nowrap block px-7 py-3 font-medium text-white bg-orange-500 rounded-lg shadow-xl hover:bg-orange-600"],
            ["btn-pill", "rounded-full"]
        ],
        theme: {
            breakpoints: {
                sm: "576px",
                md: "768px",
                lg: "992px",
                xl: "1200px",
                xxl: "1400px",
                uw: "2000px"
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
            transformerDirectives(),
            transformerVariantGroup()
        ]
    },
    app: {
        head: {
            charset: "utf-8",
            viewport: "width=device-width, initial-scale=1",
            meta: [
                { name: "format-detection", content: "no" },
                { name: "msapplication-TileColor", content: "#ffffff" },
                { name: "theme-color", content: "#ffffff" }
            ],
            link: [
                { rel: "shortcut-icon", href: "/favicon.png" },
                { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
                { rel: "icon", type: "image/png", href: "/favicon-32x32.png" },
                { rel: "icon", type: "image/png", href: "/favicon-16x16.png" },
                { rel: "manifest", href: "/site.webmanifest" },
                { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#e7712e" }
            ],
            htmlAttrs: {
                lang: "en"
            }
        }
    },
    runtimeConfig: {
        public: {
            redirectUrl: process.env.SUPABASE_REDIRECT
        }
    }
});
