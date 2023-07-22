/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xxxs: "400px",
      s450: "450px",
      xxs: "500px",
      xs: "540px",
      s: "600px",
      sm: "640px",
      ssm: "670px",
      m: "700px",
      md: "768px",
      mmd: "800px",
      mmmd: "850px",
      pc: "900px",
      lg: "1024px",
      llg: "1124px",
      xl: "1280px",
      xxl: "1536px",
    },
    extend: {
      fontFamily: { satoshi: "'Satoshi', sans-serif" },
    },
  },
  plugins: [],
};
