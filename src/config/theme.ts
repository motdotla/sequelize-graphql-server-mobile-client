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
import { MD3Typescale } from "react-native-paper/lib/typescript/types";

const LightTheme = deepmerge(NavigationDefaultTheme, PaperLightTheme);
const DarkTheme = deepmerge(NavigationDarkTheme, PaperDarkTheme);

const typescale: MD3Typescale = deepmerge(LightTheme.typescale, {
  displayLarge: {
    fontFamily: "Montserrat_900Black",
  },
  displayMedium: {
    fontFamily: "Montserrat_800ExtraBold",
  },
  displaySmall: {
    fontFamily: "Montserrat_700Bold",
  },
  headlineLarge: {
    fontFamily: "Montserrat_900Black",
  },
  headlineMedium: {
    fontFamily: "Montserrat_800ExtraBold",
  },
  headlineSmall: {
    fontFamily: "Montserrat_700Bold",
  },
  titleLarge: {
    fontFamily: "Montserrat_900Black",
  },
  titleMedium: {
    fontFamily: "Montserrat_800ExtraBold",
  },
  titleSmall: {
    fontFamily: "Montserrat_700Bold",
  },
  bodyLarge: {
    fontFamily: "Montserrat_600SemiBold",
  },
  bodyMedium: {
    fontFamily: "Montserrat_500Medium",
  },
  bodySmall: {
    fontFamily: "Montserrat_400Regular",
  },
  labelLarge: {
    fontFamily: "Montserrat_600SemiBold",
  },
  labelMedium: {
    fontFamily: "Montserrat_500Medium",
  },
  labelSmall: {
    fontFamily: "Montserrat_400Regular",
  },
} as MD3Typescale);

const lightTheme = {
  ...LightTheme,
  typescale,
} as typeof LightTheme;

const darkTheme = {
  ...DarkTheme,
  typescale,
} as typeof DarkTheme;

const getTheme = (theme: AppColorScheme) =>
  theme === "light" ? lightTheme : darkTheme;

export default getTheme;
