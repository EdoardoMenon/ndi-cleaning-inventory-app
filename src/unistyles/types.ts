import { lightTheme, darkTheme } from "./themes";

type AppThemes = {
  light: typeof lightTheme;
  dark: typeof darkTheme;
};

declare module "react-native-unistyles" {
  export interface UnistylesThemes extends AppThemes {}
}
