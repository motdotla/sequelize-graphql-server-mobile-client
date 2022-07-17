import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { View, ScrollView, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import Button from "~components/Button";
import useLogout from "~hooks/api/useLogout";
import { usePreferences } from "~hooks/app";

export default function Settings() {
  const { t } = useTranslation();
  const {
    setPreference,
    preferences: { theme },
  } = usePreferences();

  const { loading, logout } = useLogout();

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
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.container}></View>
        <Button
          mode="contained-tonal"
          loading={loading}
          disabled={loading}
          onPress={logout}
        >
          {t("Log out")}
        </Button>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 72,
  },
  container: {
    flex: 1,
  },
});
