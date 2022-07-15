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
import { useCallback, useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { Provider as PaperProvider } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { NavigationContainer } from "@react-navigation/native";
import getTheme from "~config/theme";
import Navigator from "~screens/Navigator";
import usePreferences from "~hooks/usePreferences";

export default function Main() {
  const { ready } = useTranslation();
  const [navigatorReady, setNavigatorReady] = useState(false);
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

    if (fontsLoaded && ready && navigatorReady) {
      prepare();
    }
  }, [fontsLoaded, ready, navigatorReady]);

  const onNavigatorReady = useCallback(() => setNavigatorReady(true), []);

  const appTheme = useMemo(
    () => (theme === "auto" ? getTheme(colorScheme) : getTheme(theme)),
    [theme, colorScheme]
  );

  if (!(fontsLoaded && ready)) {
    return null;
  }

  return (
    <PaperProvider theme={appTheme}>
      <NavigationContainer theme={appTheme} onReady={onNavigatorReady}>
        <Navigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
