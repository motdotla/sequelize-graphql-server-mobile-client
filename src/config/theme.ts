import { ColorSchemeName } from "react-native";
import {
  MD3LightTheme as PaperLightTheme,
  MD3DarkTheme as PaperDarkTheme,
  Theme,
} from "react-native-paper";

export type AppColorScheme = ColorSchemeName | "auto";

const lightTheme = {
  ...PaperLightTheme,
  version: 3,
} as Theme;

const darkTheme = {
  ...PaperDarkTheme,
  dark: true,
  version: 3,
} as Theme;

const getTheme = (theme: AppColorScheme) =>
  theme === "light" ? lightTheme : darkTheme;

export default getTheme;
