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
        "lg-left": "url('/hero/lg-left.png')",
        "lg-blob-left": "url('/hero/lg-blob-left.svg')",
        "lg-right": "url('/hero/lg-right.png')",
        "lg-blob-right": "url('/hero/lg-blob-right.svg')",
        "md-left": "url('/hero/md-left.png')",
        "md-right": "url('/hero/md-right.png')",
        "md-blob-right": "url('/hero/md-blob-right.svg')",
        "sm-left": "url('/hero/sm-left.png')",
        "sm-right": "url('/hero/sm-right.png')",
        "sm-blob-right": "url('/hero/sm-blob-right.svg')",
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
