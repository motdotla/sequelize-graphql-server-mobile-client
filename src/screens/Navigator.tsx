import { useCallback } from "react";
import { View, StatusBar } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
import Toast from "react-native-root-toast";
import { useTranslation } from "react-i18next";
import usePreferences from "~hooks/usePreferences";
import { AppColorScheme } from "@types";

export default function Navigator() {
  const { t } = useTranslation();

  const { colors, dark } = useTheme();
  const { setPreference } = usePreferences();
  const handleTheme = useCallback(
    (scheme: AppColorScheme) => () => setPreference("theme", scheme),
    []
  );
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <StatusBar
        backgroundColor={colors.background}
        barStyle={dark ? "light-content" : "dark-content"}
      />
      <Text>{t("My App")}</Text>
      <Button onPress={handleTheme("light")}>{t("Light")}</Button>
      <Button onPress={handleTheme("dark")}>{t("Dark")}</Button>
      <Button onPress={handleTheme("auto")}>{t("Auto")}</Button>
      <Button onPress={() => Toast.show(t("Hello World!"))}>Show</Button>
    </View>
  );
}
