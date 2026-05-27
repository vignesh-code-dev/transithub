module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBg: "#FFFFFF",
        brand: "#FFC200",
        highlight: "#AED6F1",
        bodyText: "#1A1A2E",
        secondaryText: "#5D6D7E",
        border: "#E0E0E0",

      

        // Custom colors for form states

        placeholder: "#BDBDBD",
        inputfield: "#FFFDE7",
        error: "#C0392B",
        disableBg: "#F2F2F2",
        disableText: "#BDBDBD",

        // Custom status colors

        activeBg: "#AED6F1",
        activeText: "#1A1A2E",
        pendingBg: "#FFF9C4",
        pendingText: "#7D6608",
        completedBg: "#D5F5E3",
        completedText: "#1E8449",
        rejectedBg: "#FADBD8",
        rejectedText: "#C0392B",
        warningBg: "#FDEBD0",
        warningText: "#D35400",
        inactiveBg: "#F2F2F2",
        inactiveText: "#5D6D7E",
      },

      // Custom font families

      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Roboto Mono", "monospace"],

        heading: ["Inter", "sans-serif"],
        code: ["Roboto Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
