import { useRef } from "react";
import { StyleSheet, View, TextInput as RTextInput } from "react-native";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput, Button } from "react-native-paper";
import { RootStackScreenProps } from "types";

export default function Login({ navigation }: RootStackScreenProps<"Login">) {
  const { t } = useTranslation();
  const passwordInputRef = useRef<RTextInput>(null);

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.gap}>
        <TextInput
          dense
          blurOnSubmit={false}
          onSubmitEditing={() => passwordInputRef.current?.focus()}
          autoComplete="email"
          label={t("Email")}
          style={styles.gap}
          returnKeyType="next"
          keyboardType="email-address"
        />
        <TextInput
          dense
          secureTextEntry
          ref={passwordInputRef}
          label={t("Password")}
          style={styles.gap}
          autoComplete="password"
        />
        <Button
          onPress={() => navigation.navigate("ForgotPassword")}
          style={styles.gap}
        >
          {t("Forgot your password?")}
        </Button>
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
        {t("Login")}
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("Register")}
        style={styles.gap}
      >
        {t("Don't have an account?")}
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
