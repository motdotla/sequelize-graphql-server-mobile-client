import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
} from "@expo-google-fonts/montserrat";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Linking from "expo-linking";
import Constants from "expo-constants";
import { Provider as PaperProvider } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { LinkingOptions, NavigationContainer } from "@react-navigation/native";
import getTheme from "~config/theme";
import Navigator from "~screens/Navigator";
import { usePreferences } from "~hooks/app";
import { RootStackParamList } from "types";

const prefix = Linking.createURL("/");
const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [prefix, Constants.manifest?.extra?.universalPrefix],
  config: {
    initialRouteName: "Home",
    screens: {
      ResetPassword: "/reset_password",
      Account: "/verify_email",
    },
  },
};

export default function Main() {
  const { ready } = useTranslation();
  const [navigatorReady, setNavigatorReady] = useState(false);
  const {
    preferences: { theme },
  } = usePreferences();
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
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
      <NavigationContainer
        linking={linking}
        theme={appTheme}
        onReady={onNavigatorReady}
      >
        <Navigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
