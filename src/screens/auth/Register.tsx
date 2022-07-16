import { useRef } from "react";
import { StyleSheet, View, TextInput as RTextInput } from "react-native";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput, Button } from "react-native-paper";
import { RootStackScreenProps } from "types";

export default function Register({
  navigation,
}: RootStackScreenProps<"Register">) {
  const { t } = useTranslation();
  const lastNameInputRef = useRef<RTextInput>(null);
  const emailInputRef = useRef<RTextInput>(null);
  const passwordInputRef = useRef<RTextInput>(null);

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.gap}>
        <TextInput
          dense
          autoFocus
          blurOnSubmit={false}
          onSubmitEditing={() => lastNameInputRef.current?.focus()}
          autoComplete="name-given"
          label={t("First name")}
          style={styles.gap}
          returnKeyType="next"
        />
        <TextInput
          dense
          ref={lastNameInputRef}
          blurOnSubmit={false}
          onSubmitEditing={() => emailInputRef.current?.focus()}
          autoComplete="name-family"
          label={t("Last name")}
          style={styles.gap}
          returnKeyType="next"
        />
        <TextInput
          dense
          ref={emailInputRef}
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
          ref={passwordInputRef}
          label={t("Password")}
          style={styles.gap}
          secureTextEntry
          autoComplete="password-new"
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
        {t("Create account")}
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
