import { defineConfig } from "vite-plugin-windicss";
import BsGrid from "@spada/windicss-plugin-bsgrid";

export default defineConfig({
	transformCSS: "pre",
	attributify: false,
	darkMode: "class",
	extract: {
		include: ["app.vue", "pages/**/*.vue", "layouts/**/*.vue", "components/**/*.vue"],
		exclude: ["node_modules", ".gitignore", ".env", "public"]
	},
	corePlugins: {
		container: false
	},
	theme: {
        extend: {
            colors: {
                accent: "#fb8500"
            }
        },
        screens: {
            sm: "576px",
            md: "768px",
            lg: "992px",
            xl: "1200px",
            xxl: "1400px",
            ultrawide: "2000px"
        }
	},
    plugins: [BsGrid()]
});
