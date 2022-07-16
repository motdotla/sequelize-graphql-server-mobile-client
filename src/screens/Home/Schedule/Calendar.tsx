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
      <Text>{t("My App")}</Text>
    </View>
  );
}
