import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        'calm-blue': {
          50: "var(--calm-blue-50)",
          100: "var(--calm-blue-100)",
          200: "var(--calm-blue-200)",
          300: "var(--calm-blue-300)",
          400: "var(--calm-blue-400)",
          500: "var(--calm-blue-500)",
          600: "var(--calm-blue-600)",
          700: "var(--calm-blue-700)",
          800: "var(--calm-blue-800)",
          900: "var(--calm-blue-900)",
        },
        'nature-green': {
          50: "var(--nature-green-50)",
          100: "var(--nature-green-100)",
          200: "var(--nature-green-200)",
          300: "var(--nature-green-300)",
          400: "var(--nature-green-400)",
          500: "var(--nature-green-500)",
          600: "var(--nature-green-600)",
          700: "var(--nature-green-700)",
          800: "var(--nature-green-800)",
          900: "var(--nature-green-900)",
        },
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["Georgia", "serif"],
        mono: ["Menlo", "monospace"],
      },
      animation: {
        "breathe": "breathe 4s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "progress": "progress 1500ms linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        breathe: {
          "0%, 100%": { 
            transform: "scale(0.8)", 
            opacity: "0.8" 
          },
          "50%": { 
            transform: "scale(1.2)", 
            opacity: "1" 
          },
        },
        progress: {
          "0%": { 
            transform: "rotate(0deg)" 
          },
          "100%": { 
            transform: "rotate(360deg)" 
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
