import { StyleSheet } from "react-native-unistyles";
import { lightTheme, darkTheme } from "./themes";
import "./types";

StyleSheet.configure({
  themes: {
    light: lightTheme,
    dark: darkTheme,
  },
  settings: {
    initialTheme: "dark",
  },
});
