/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: '#E54065',
        background: '#F4F5F9',
        border: '#CFD2DC',
        text: '#636363',
        filter: '#E1E4EA',
        read: '#F2F2F2',
      },
    },
  },
  plugins: [],
};
