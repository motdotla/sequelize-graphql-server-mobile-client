import { BackHandler, View, StyleSheet } from "react-native";
import { FAB, Portal, Text } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useCallback, useState } from "react";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { useDrawerStatus } from "@react-navigation/drawer";

export default function Calendar() {
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const drawerStatus = useDrawerStatus();
  const [openFab, setOpenFab] = useState(false);
  const onFabStateChange = useCallback(
    ({ open }: { open: boolean }) => setOpenFab(open),
    []
  );

  const visible = isFocused && drawerStatus === "closed";

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (openFab) {
          setOpenFab(false);
          return true;
        }
        return false;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [openFab])
  );

  return (
    <View style={styles.container}>
      <Text variant="displayLarge">{t("My App")}</Text>
      <Text variant="displayMedium">{t("My App")}</Text>
      <Text variant="displaySmall">{t("My App")}</Text>
      <Text variant="headlineLarge">{t("My App")}</Text>
      <Text variant="headlineMedium">{t("My App")}</Text>
      <Text variant="headlineSmall">{t("My App")}</Text>
      <Text variant="titleLarge">{t("My App")}</Text>
      <Text variant="titleMedium">{t("My App")}</Text>
      <Text variant="titleSmall">{t("My App")}</Text>
      <Text variant="bodyLarge">{t("My App")}</Text>
      <Text variant="bodyMedium">{t("My App")}</Text>
      <Text variant="bodySmall">{t("My App")}</Text>
      <Text variant="labelLarge">{t("My App")}</Text>
      <Text variant="labelMedium">{t("My App")}</Text>
      <Text variant="labelSmall">{t("My App")}</Text>
      <Portal>
        <FAB.Group
          visible={visible}
          open={openFab}
          icon={openFab ? "calendar-today" : "plus"}
          actions={[
            { icon: "pin", label: t("Pin schedule"), onPress: () => null },
            {
              icon: "pencil",
              label: t("Create schedule"),
              onPress: () => null,
            },
          ]}
          onStateChange={onFabStateChange}
          style={styles.fab}
        />
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  fab: {
    paddingBottom: 72,
  },
});
