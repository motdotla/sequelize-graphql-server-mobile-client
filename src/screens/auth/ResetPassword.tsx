import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput, Button } from "react-native-paper";
import { RootStackScreenProps } from "types";

export default function ResetPassword({
  navigation,
}: RootStackScreenProps<"ResetPassword">) {
  const { t } = useTranslation();
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.gap}>
        <TextInput
          secureTextEntry={secureTextEntry}
          autoFocus
          label={t("New Password")}
          autoComplete="password-new"
          style={styles.gap}
          right={
            <TextInput.Icon
              name={secureTextEntry ? "eye" : "eye-off"}
              onPress={() => setSecureTextEntry(!secureTextEntry)}
            />
          }
        />
      </View>
      <Button
        mode="contained"
        onPress={() =>
          navigation.navigate("Home", {
            screen: "Schedule",
            params: {
              screen: "Calendar",
            },
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
    paddingBottom: 48,
    justifyContent: "flex-end",
  },
  gap: {
    marginBottom: 8,
  },
});
