import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Appbar, Text } from "react-native-paper";
import usePreferences from "~hooks/usePreferences";

export default function Account() {
  const { t } = useTranslation();
  const {
    setPreference,
    preferences: { theme },
  } = usePreferences();

  const handleTheme = useCallback(
    () => setPreference("theme", theme === "dark" ? "light" : "dark"),
    [theme]
  );

  return (
    <>
      <Appbar mode="center-aligned">
        <Appbar.Content title={t("Settings")} />
        <Appbar.Action icon="theme-light-dark" onPress={handleTheme} />
      </Appbar>
      <View
        style={{
          padding: 16,
        }}
      >
        <Text>{t("Setting")}</Text>
      </View>
    </>
  );
}
