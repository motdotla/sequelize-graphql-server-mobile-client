import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import Button from "./Button";

type Props = {
  message: string;
  onRetry?: () => void;
};

export default function ErrorState({ message, onRetry }: Props) {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text variant="displayLarge">{message}</Text>
      {!!onRetry && (
        <View style={styles.gap}>
          <Button mode="contained-tonal" onPress={onRetry}>
            {t("Try again")}
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  gap: {
    marginTop: 8,
  },
});
