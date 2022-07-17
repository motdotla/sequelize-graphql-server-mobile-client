import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export default function Notifications() {
  const { t } = useTranslation();

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Text>{t("Notifications settings")}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    padding: 16,
  },
});
