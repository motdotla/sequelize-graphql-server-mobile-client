import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput, Button } from "react-native-paper";
import { RootStackScreenProps } from "types";

export default function ForgotPassword({
  navigation,
}: RootStackScreenProps<"ForgotPassword">) {
  const { t } = useTranslation();

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.gap}>
        <TextInput
          autoFocus
          autoComplete="email"
          label={t("Email")}
          style={styles.gap}
          returnKeyType="next"
          keyboardType="email-address"
        />
      </View>
      <Button
        mode="contained"
        onPress={() =>
          navigation.navigate("ResetPassword", {
            token: "",
          })
        }
        style={styles.gap}
      >
        {t("Continue")}
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    padding: 16,
    justifyContent: "flex-end",
  },
  gap: {
    marginBottom: 8,
  },
});
