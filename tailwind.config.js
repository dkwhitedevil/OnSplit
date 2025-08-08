/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
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
        border: "var(--color-border)", // elevated-surface
        input: "var(--color-input)", // elevated-surface
        ring: "var(--color-ring)", // cyan
        background: "var(--color-background)", // deep-slate
        foreground: "var(--color-foreground)", // white
        primary: {
          DEFAULT: "var(--color-primary)", // cyan
          foreground: "var(--color-primary-foreground)", // deep-slate
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", // deep-purple
          foreground: "var(--color-secondary-foreground)", // white
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", // clear-red
          foreground: "var(--color-destructive-foreground)", // white
        },
        muted: {
          DEFAULT: "var(--color-muted)", // muted-surface
          foreground: "var(--color-muted-foreground)", // muted-purple-gray
        },
        accent: {
          DEFAULT: "var(--color-accent)", // sunset-coral
          foreground: "var(--color-accent-foreground)", // white
        },
        popover: {
          DEFAULT: "var(--color-popover)", // elevated-surface
          foreground: "var(--color-popover-foreground)", // white
        },
        card: {
          DEFAULT: "var(--color-card)", // elevated-surface
          foreground: "var(--color-card-foreground)", // white
        },
        success: {
          DEFAULT: "var(--color-success)", // mint-green
          foreground: "var(--color-success-foreground)", // deep-slate
        },
        warning: {
          DEFAULT: "var(--color-warning)", // warm-yellow
          foreground: "var(--color-warning-foreground)", // deep-slate
        },
        error: {
          DEFAULT: "var(--color-error)", // clear-red
          foreground: "var(--color-error-foreground)", // white
        },
        // Custom brand colors
        cyan: "#00FFFF", // cyan
        purple: "#6E00FF", // deep-purple
        coral: "#FF6B6B", // sunset-coral
        slate: "#0E0F1C", // deep-slate
        surface: "var(--color-surface)", // elevated-surface
        "surface-hover": "var(--color-surface-hover)", // muted-surface
        "text-primary": "var(--color-text-primary)", // white
        "text-secondary": "var(--color-text-secondary)", // muted-purple-gray
        "gradient-start": "var(--color-gradient-start)", // cyan
        "gradient-end": "var(--color-gradient-end)", // deep-purple
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'jetbrains-mono': ['JetBrains Mono', 'monospace'],
        'roboto-mono': ['Roboto Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      boxShadow: {
        'neon': '0 0 20px rgba(0, 255, 255, 0.3)',
        'neon-purple': '0 0 20px rgba(110, 0, 255, 0.3)',
        'neon-coral': '0 0 20px rgba(255, 107, 107, 0.3)',
        'elevation-1': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'elevation-2': '0 4px 20px rgba(0, 255, 255, 0.1)',
        'elevation-3': '0 8px 32px rgba(0, 255, 255, 0.15)',
        'elevation-4': '0 16px 48px rgba(0, 255, 255, 0.2)',
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 3s ease-in-out infinite",
        "pulse-neon": "pulse-neon 2s ease-in-out infinite",
        "fade-in": "fade-in 0.2s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
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
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-neon": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(0, 255, 255, 0.5)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}