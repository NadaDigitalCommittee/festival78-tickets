import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {},
      colors: {
        theme: "#FF9209",
      },
      fontFamily: {
        avianosans: ["aviano-sans"],
        zen_kaku_gothic_new: ["var(--font-zen-kaku-gothic-new)"],
      },
    },
  },
  plugins: [],
};
export default config;
