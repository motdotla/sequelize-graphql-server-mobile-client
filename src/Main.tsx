import {
  useFonts,
  Montserrat_100Thin,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_400Regular_Italic,
  Montserrat_500Medium,
  Montserrat_500Medium_Italic,
  Montserrat_600SemiBold,
  Montserrat_600SemiBold_Italic,
  Montserrat_700Bold,
  Montserrat_700Bold_Italic,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
} from "@expo-google-fonts/montserrat";
import { useEffect, useMemo } from "react";
import { useColorScheme } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { Provider as PaperProvider } from "react-native-paper";
import getTheme from "~config/theme";
import Navigator from "~screens/Navigator";
import usePreferences from "~hooks/app";

export default function Main() {
  const {
    preferences: { theme },
  } = usePreferences();
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    Montserrat_100Thin,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_400Regular_Italic,
    Montserrat_500Medium,
    Montserrat_500Medium_Italic,
    Montserrat_600SemiBold,
    Montserrat_600SemiBold_Italic,
    Montserrat_700Bold,
    Montserrat_700Bold_Italic,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
  });

  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.hideAsync();
    };

    if (fontsLoaded) {
      prepare();
    }
  }, [fontsLoaded]);

  const appTheme = useMemo(
    () => (theme === "auto" ? getTheme(colorScheme) : getTheme(theme)),
    [theme, colorScheme]
  );

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider theme={appTheme}>
      <Navigator />
    </PaperProvider>
  );
}
