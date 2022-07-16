import {
  MD3LightTheme as PaperLightTheme,
  MD3DarkTheme as PaperDarkTheme,
} from "react-native-paper";
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import deepmerge from "deepmerge";
import { AppColorScheme } from "types";

const LightTheme = deepmerge(NavigationDefaultTheme, PaperLightTheme);
const DarkTheme = deepmerge(NavigationDarkTheme, PaperDarkTheme);

const lightTheme = {
  ...LightTheme,
} as typeof LightTheme;

const darkTheme = {
  ...DarkTheme,
} as typeof DarkTheme;

const getTheme = (theme: AppColorScheme) =>
  theme === "light" ? lightTheme : darkTheme;

export default getTheme;
