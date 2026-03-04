import { lightTheme, darkTheme } from "./themes";

type AppThemes = {
  light: typeof lightTheme;
  dark: typeof darkTheme;
};

type AppBreakpoints = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
};

declare module "react-native-unistyles" {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}
