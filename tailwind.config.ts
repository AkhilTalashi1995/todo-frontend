import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "black-box": "#0D0D0D",
        "background-light": "#1A1A1A",
        "button-primary": "#1E6F9F",
        "button-primary-hover": "#4A9AC7",
        "title-text": "#4EA8DE",
        "app-text": "#5E60CE",
        "secondary-text": "#8284FA",
        "task-card": "#262626",
        "white-text": "#F2F2F2",
        "counter-bg": "#333333",
        "counter-text": "#D9D9D9",
        "primaryLight": "#4FA3D1",
        "bin": "#808080",
        "pick-red": "#FF3B30",
        "pick-orange": "#FF9500",
        "pick-yellow": "#FFCC00",
        "pick-green": "#34C759",
        "pick-blue": "#007AFF",
        "pick-indigo": "#5856D6",
        "pick-purple": "#AF52DE",
        "pick-pink": "#FF2D55",
        "pick-brown": "#A2845E",
      },
    },
  },
  plugins: [],
  safelist: [],
};