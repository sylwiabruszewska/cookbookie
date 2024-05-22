import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "checkmark-in": "checkmark-in 2s forwards",
      },
      keyframes: {
        "checkmark-in": {
          "0%": { opacity: "0", transform: "translate(-50%, 100%)" },
          "50%": { opacity: "1", transform: "translate(-50%, -50%)" },
          "100%": { opacity: "0", transform: "translate(-50%, -200%)" },
        },
      },
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
    },
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1280px",
    },
  },
  plugins: [],
};
export default config;
