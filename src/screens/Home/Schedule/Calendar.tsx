import { BackHandler, View, StyleSheet } from "react-native";
import { FAB, Portal } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useCallback, useState } from "react";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { useDrawerStatus } from "@react-navigation/drawer";
import { ScheduleScreenProps } from "types";
import AddEvent from "./AddEvent";

export default function Calendar({
  navigation,
}: ScheduleScreenProps<"Calendar">) {
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const drawerStatus = useDrawerStatus();
  const [openFab, setOpenFab] = useState(false);
  const [openAddEvent, setOpenAddEvent] = useState(false);
  const onFabStateChange = useCallback(
    ({ open }: { open: boolean }) => setOpenFab(open),
    []
  );
  const closeAddEvent = useCallback(() => setOpenAddEvent(false), []);
  const onPress = useCallback(() => {
    if (openFab) {
      setOpenAddEvent(true);
    }
  }, [openFab]);

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
      <Portal>
        <FAB.Group
          visible={visible}
          open={openFab}
          icon={openFab ? "calendar-today" : "plus"}
          actions={[
            {
              icon: "pencil",
              label: t("Create schedule"),
              onPress: () => navigation.navigate("NewSchedule"),
            },
          ]}
          onStateChange={onFabStateChange}
          style={styles.fab}
          onPress={onPress}
        />
      </Portal>
      <AddEvent visible={openAddEvent} onDismiss={closeAddEvent} />
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
