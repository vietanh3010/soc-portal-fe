/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');
const palette = require('./src/theme/palette.js');

module.exports = {
    darkMode: ["class"],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
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
                ...palette,
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
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
                bouncy: {
                    '0%, 100%': { transform: 'translateY(-5px)' },
                    '50%': { transform: 'translateY(5px)' },

                },
                fadeup: {
                    '0%': { transform: 'translate3d(0, 30px, 0)', opacity: 0 },
                    '100%': { transform: 'translate3d(0, 0, 0)', opacity: 1 },
                },
                faderight: {
                    '0%': { transform: 'translate3d(-30px, 0, 0)', opacity: 0 },
                    '100%': { transform: 'translate3d(0, 0, 0)', opacity: 1 },
                },
                fadeleft: {
                    '0%': { transform: 'translate3d(30px, 0, 0)', opacity: 0 },
                    '100%': { transform: 'translate3d(0, 0, 0)', opacity: 1 },
                },
                fadeupSm: {
                    '0%': { transform: 'translate3d(0, 20px, 0)', opacity: 0 },
                    '100%': { transform: 'translate3d(0, 0, 0)', opacity: 1 },
                },
                fadedown: {
                    '0%': { transform: 'translate3d(0, -30px, 0)', opacity: 0 },
                    '100%': { transform: 'translate3d(0, 0, 0)', opacity: 1 },
                },
                fadedownSm: {
                    '0%': { transform: 'translate3d(0, -20px, 0)', opacity: 0 },
                    '100%': { transform: 'translate3d(0, 0, 0)', opacity: 1 },
                },
                zoomOut: {
                    '0%': { transform: 'scale(0%)', opacity: 0 },
                    '100%': { transform: 'scale(100%)', opacity: 1 },
                },
                spin: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(-359deg)' },
                },
                spinRight: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(359deg)' },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                bouncy: 'bouncy 1s ease-in-out infinite',
                fadeup: 'fadeup 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                faderight: 'faderight 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                fadeleft: 'fadeleft 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                fadeupSm: 'fadeupSm 0.15s',
                zoomOut: 'zoomOut 0.3s',
                fadedown: 'fadedown 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                fadedownSm: 'fadedownSm 0.15s',
                spin: 'spin 0.8s infinite',
                spinRight: 'spinRight 0.8s infinite',
            },
        },
    },
    variants: {
        extend: {
            borderStyle: ['important', 'hover', 'last'],
            borderColor: ['important', 'hover', 'last'],
            borderWidth: ['important', 'hover', 'last'],
            borderRadius: ['important', 'hover', 'last'],
            textColor: ['important', 'hover', 'first', 'last'],
            height: ['important', 'hover', 'first', 'last'],
            width: ['important', 'hover', 'first', 'last'],
            backgroundColor: ['important', 'hover', 'first', 'last'],
            padding: ['important', 'hover', 'first', 'last'],
            position: ['important', 'hover', 'first', 'last'],
            display: ['important', 'hover', 'first', 'last'],
            cursor: ['important', 'hover', 'first', 'last'],
            pointerEvents: ['important', 'hover', 'first', 'last'],
            zIndex: ['important', 'hover', 'first', 'last'],
            maxHeight: ['important', 'hover', 'first', 'last'],
            overflow: ['important', 'hover', 'first', 'last'],
            margin: ['important', 'hover', 'first', 'last'],
        }
    },
    plugins: [
        require("tailwindcss-animate"),
        plugin(function ({ addVariant }) {
            addVariant('important', ({ container }) => {
                container.walkRules(rule => {
                    rule.selector = `.\\!${rule.selector.slice(1)}`
                    rule.walkDecls(decl => {
                        decl.important = true
                    })
                })
            })
        }),
        plugin(function ({ addVariant }) {
            addVariant('child', '& > *');
            addVariant('child-hover', '& > *:hover');
        }),
    ],
}