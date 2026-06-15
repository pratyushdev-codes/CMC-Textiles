/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Core blue/white system
        ink: "#0B2E4F", // deepest navy — primary text & headers
        brand: {
          50: "#EAF2FE",
          100: "#D6E4FD",
          200: "#AECBFB",
          300: "#7EAAF6",
          400: "#4D85EF",
          500: "#1F62E0", // primary action blue
          600: "#1450C2",
          700: "#0F3E9C",
          800: "#0E3478",
          900: "#0B2E4F",
        },
        canvas: "#F1F5FB", // app background tint
        line: "#E3EAF3", // hairline borders
        // Brand spectrum (from logo) — used ONLY as data: yarn swatches & category dots
        spectrum: {
          red: "#C0392B",
          orange: "#D9651E",
          amber: "#E2A019",
          green: "#4F8C3A",
          teal: "#1F8A8A",
          blue: "#1F62E0",
        },
      },
      fontFamily: {
        display: ['"Sora"', "system-ui", "sans-serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      fontWeight: {
        400: "400",
        500: "500",
        600: "600",
        700: "700",
        800: "800",
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,46,79,0.04), 0 8px 24px -12px rgba(11,46,79,0.12)",
        nav: "0 -2px 16px -8px rgba(11,46,79,0.18)",
        sheet: "0 -8px 40px -12px rgba(11,46,79,0.30)",
        phone: "0 40px 80px -24px rgba(11,46,79,0.45)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        "slide-up": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "translateY(8px) scale(0.98)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "thread-fill": {
          from: { transform: "scaleY(0)" },
          to: { transform: "scaleY(1)" },
        },
        "toast-in": {
          from: { opacity: "0", transform: "translateY(-12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "slide-up": "slide-up 0.32s cubic-bezier(0.22,1,0.36,1)",
        "fade-in": "fade-in 0.3s ease",
        "scale-in": "scale-in 0.28s cubic-bezier(0.22,1,0.36,1)",
        "toast-in": "toast-in 0.28s cubic-bezier(0.22,1,0.36,1)",
      },
    },
  },
  plugins: [],
};
