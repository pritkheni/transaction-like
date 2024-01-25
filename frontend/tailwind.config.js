/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        green: "0 0 2px 1px rgb(0, 230, 0)",
        error: "0 0 2px 1px rgb(255, 0, 0)",
        initial: "0 0 0 1px rgb(153, 153, 153)",
        focus: "0 0 0 1px rgb(0, 0, 0)",
      },
    },
  },
  plugins: [],
};
