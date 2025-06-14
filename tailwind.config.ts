import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#00d4ff",
          foreground: "#000814",
          50: "#f0fdff",
          100: "#ccf7fe",
          200: "#9aedfe",
          300: "#5dddfc",
          400: "#00d4ff",
          500: "#00a8cc",
          600: "#0284a3",
          700: "#0a6b85",
          800: "#10576d",
          900: "#134a5c",
        },
        secondary: {
          DEFAULT: "#1a1a2e",
          foreground: "#e0e7ff",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#16213e",
          foreground: "#94a3b8",
        },
        accent: {
          DEFAULT: "#0f3460",
          foreground: "#e0e7ff",
        },
        popover: {
          DEFAULT: "#0f172a",
          foreground: "#e2e8f0",
        },
        card: {
          DEFAULT: "#0f172a",
          foreground: "#e2e8f0",
        },
        // Enhanced neon colors with pink
        neon: {
          blue: "#00d4ff",
          cyan: "#00ffff",
          purple: "#8b5cf6",
          pink: "#ff1493",
          magenta: "#ff00ff",
          rose: "#f472b6",
          green: "#10b981",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        glow: {
          "0%, 100%": {
            boxShadow: "0 0 5px #00d4ff, 0 0 10px #00d4ff, 0 0 15px #00d4ff",
          },
          "50%": {
            boxShadow: "0 0 10px #ff1493, 0 0 20px #ff1493, 0 0 30px #ff1493",
          },
        },
        "pulse-neon": {
          "0%, 100%": {
            borderColor: "#00d4ff",
            boxShadow: "0 0 5px #00d4ff",
          },
          "33%": {
            borderColor: "#ff1493",
            boxShadow: "0 0 10px #ff1493, 0 0 20px #ff1493",
          },
          "66%": {
            borderColor: "#00ffff",
            boxShadow: "0 0 10px #00ffff, 0 0 20px #00ffff",
          },
        },
        "rainbow-border": {
          "0%": {
            borderColor: "#00d4ff",
            boxShadow: "0 0 10px #00d4ff",
          },
          "25%": {
            borderColor: "#ff1493",
            boxShadow: "0 0 10px #ff1493",
          },
          "50%": {
            borderColor: "#8b5cf6",
            boxShadow: "0 0 10px #8b5cf6",
          },
          "75%": {
            borderColor: "#00ffff",
            boxShadow: "0 0 10px #00ffff",
          },
          "100%": {
            borderColor: "#00d4ff",
            boxShadow: "0 0 10px #00d4ff",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pink-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 5px #ff1493, 0 0 10px #ff1493",
          },
          "50%": {
            boxShadow: "0 0 15px #ff1493, 0 0 25px #ff1493, 0 0 35px #ff1493",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        glow: "glow 3s ease-in-out infinite alternate",
        "pulse-neon": "pulse-neon 3s ease-in-out infinite",
        "rainbow-border": "rainbow-border 4s linear infinite",
        float: "float 3s ease-in-out infinite",
        "pink-pulse": "pink-pulse 2s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "cyber-grid": `
          linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
        `,
        "pink-cyber-grid": `
          linear-gradient(rgba(255, 20, 147, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 20, 147, 0.1) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        grid: "50px 50px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
