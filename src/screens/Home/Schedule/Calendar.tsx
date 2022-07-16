import { View } from "react-native";
import { Text } from "react-native-paper";
import { useTranslation } from "react-i18next";

export default function Calendar() {
  const { t } = useTranslation();
  return (
    <View
      style={{
        padding: 16,
      }}
    >
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
    </View>
  );
}
