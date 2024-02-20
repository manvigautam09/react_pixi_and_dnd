/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme"); // eslint-disable-line @typescript-eslint/no-var-requires
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
      tinos: ["var(--font-tinos)", ...defaultTheme.fontFamily.sans],
    },
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
    },
    extend: {
      colors: {
        black: {
          DEFAULT: "#101828",
          1: "#030712",
          2: "#121212",
        },
        white: "#FFFFFF",
        primary: {
          blue: "#050038",
          green: "#25F46F",
        },
        secondary: {
          DEFAULT: "#1F79D2",
          bright: "#1B8CFD",
          highlight: "#E3F1FF",
        },
        gray: {
          "extra-light": "#F9FAFB",
          "light-1": "#F3F4F6",
          "light-2": "#E5E7EB",
          "light-3": "#D1D5DB",
          "light-4": "#D0D5DD",
          "light-5": "#EAECF0",
          "medium-1": "#9CA3AF",
          "medium-2": "#6B7280",
          "medium-3": "#4B5563",
          "medium-4": "#344054",
          "medium-5": "#98A2B3",
          "dark-1": "#1F2937",
          "dark-2": "#1D2939",
          "dark-3": "#1F2937",
          background: "#fbfcfe",
        },
        alert: {
          error: "#E9002A",
          success: "#178740",
          progress: "#FFAB2D",
        },
        extras: {
          green: "#A8FF9A",
          "light-green": "#DFFFD6",
          blue: "#C2E0FC",
          yellow: "#FCFF77",
          "light-yellow": "#FCF5C7",
          purple: "#D7D0FF",
          pink: "#FFD4F8",
          gray: "#E8EDF3",
          insights: { blue: "#06B6D4", pink: "#F472B6", purple: "#818CF8" },
        },
        app: {
          black: "#030712",
          white: "#FFFFFF",
          gray: {
            "extra-light": "#F9FAFB",
            "light-1": "#F3F4F6",
            "light-2": "#E5E7EB",
            "light-3": "#D1D5DB",
            "light-4": "#F2F4F7",
            "medium-1": "#9CA3AF",
            "medium-2": "#6B7280",
            "medium-3": "#4B5563",
            dark: "#1F2937",
          },
          secondary: {
            DEFAULT: "#0A66C2",
            background: "#F8FAFC",
            border: "#E8EDF3",
            fill: "#F1F5F9",
          },
          alert: {
            error: { DEFAULT: "#E9002A", hover: "#C10123" },
            success: "#178740",
          },
        },
      },
      boxShadow: {
        "card-sm": "0px 1px 4px 0px rgba(0, 0, 0, 0.10)",
        card: "0px 2px 14px 0px #0000001A",
      },
      animation: { animateloader: "animateloader 3s linear infinite" },
    },
  },
};
