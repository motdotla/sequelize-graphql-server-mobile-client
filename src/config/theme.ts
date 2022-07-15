import { MD3LightTheme as DefaultTheme, Theme } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  version: 3,
} as Theme;

export type ThemeOverride = typeof theme;

export default theme;
