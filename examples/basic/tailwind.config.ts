import preset from "@toriistudio/glow-ui/preset";

export default {
  presets: [preset],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "../../src/**/*.{ts,tsx}",
    "../../dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@toriistudio/**/*.{js,ts,jsx,tsx}",
  ],
};
