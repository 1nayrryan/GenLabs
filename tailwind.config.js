/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0E0E10",      // off-black — text, borders, primary buttons
        paper: "#FFFFFF",     // primary background
        mist: "#F4F4F5",      // secondary surface (alternating sections, inputs)
        line: "#E4E4E7",      // hairline borders on light surfaces
        muted: "#71717A",     // secondary text
        // Color exists only as "product content," never as interface chrome:
        // the hero gradient and small status dots are the only places these appear.
        grass: "#4ADE80",
        sun: "#FFD23F",
        violet: "#A855F7",
        rose: "#FB64B6",
      },
      fontFamily: {
        body: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        pill: "9999px",
        card: "28px",
      },
      letterSpacing: {
        tightest2: "-0.04em",
      },
    },
  },
  plugins: [],
};

