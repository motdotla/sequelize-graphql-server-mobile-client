import { useCallback } from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-paper";
import Toast from "react-native-root-toast";
import { useTranslation } from "react-i18next";
import usePreferences from "~hooks/usePreferences";
import { AppColorScheme } from "@types";

export default function Home() {
  const { t } = useTranslation();
  const { setPreference } = usePreferences();
  const handleTheme = useCallback(
    (scheme: AppColorScheme) => () => setPreference("theme", scheme),
    []
  );
  return (
    <View>
      <Text>{t("My App")}</Text>
      <Button onPress={handleTheme("light")}>{t("Light")}</Button>
      <Button onPress={handleTheme("dark")}>{t("Dark")}</Button>
      <Button onPress={handleTheme("auto")}>{t("Auto")}</Button>
      <Button onPress={() => Toast.show(t("Hello World!"))}>Show</Button>
    </View>
  );
}
