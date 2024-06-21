/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "primary-light": "#e6e9ec",
      "primary-light-hover": "#d9dee3",
      "primary-light-active": "#b0bbc5",
      "primary-normal": "#002343",
      "primary-normal-hover": "#00203c",
      "primary-normal-active": "#001c36",
      "primary-dark": "#001a32",
      "primary-dark-hover": "#001528",
      "primary-dark-active": "#00101e",
      "primary-darker": "#000c17",
      //
      "secondary-light": "#fcf7f0",
      "secondary-light-hover": "#fbf3e8",
      "secondary-light-active": "#f7e5d0",
      "secondary-normal": "#e4ac66",
      "secondary-normal-hover": "#cd9b5c",
      "secondary-normal-active": "#b68a52",
      "secondary-dark": "#ab814d",
      "secondary-dark-hover": "#89673d",
      "secondary-dark-active": "#674d2e",
      "secondary-darker": "#503c24",
      //
      "text-light": "#e6e6e7",
      "text-light-hover": "#dad9db",
      "text-light-active": "#b2b1b4",
      "text-normal": "#05020d",
      "text-normal-hover": "#05020c",
      "text-normal-active": "#04020a",
      "text-dark": "#04020a",
      "text-dark-hover": "#030108",
      "text-dark-active": "#020106",
      "text-darker": "#020105",
      //
      "input-bg": "#395875",
      "input-strock": "#436789",
      //
      background: "#334F6980",
      white: "#FBFDFF",
      success: "#10B981",
      error: "#E92720",
      transparent: "transparent",
    },
    fontSize: {
      sm: "0.75rem",
      base: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "1xl": "1.5rem",
      "2xl": "2rem",
      "3xl": "2.5rem",
      "4xl": "3rem",
      "5xl": "4rem",
    },
    borderRadius: {
      xs: "4px",
      sm: "8px",
      md: "16px",
      full: "50%",
    },
    screens: {
      xs: "480px",
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [],
};
