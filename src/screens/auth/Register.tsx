import { useMemo, useRef } from "react";
import { StyleSheet, View, TextInput as RTextInput } from "react-native";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput, Button, HelperText } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RegisterInput } from "types";

export default function Register() {
  const { t } = useTranslation();
  const lastNameInputRef = useRef<RTextInput>(null);
  const emailInputRef = useRef<RTextInput>(null);
  const passwordInputRef = useRef<RTextInput>(null);

  const schema = useMemo(
    () =>
      yup
        .object({
          firstName: yup
            .string()
            .required(t("Type your first name"))
            .min(1, t("Too short")),
          lastName: yup
            .string()
            .required(t("Type your last name"))
            .min(1, t("Too short")),
          email: yup
            .string()
            .email(t("Invalid email address"))
            .required(t("Type your email")),
          password: yup
            .string()
            .required(t("Type your password"))
            .min(6, t("Password must be at least 6 characters long")),
        })
        .required(),
    [t]
  );

  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<RegisterInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.gap}>
        <Controller
          name="firstName"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <View style={styles.gap}>
              <TextInput
                dense
                autoFocus
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                blurOnSubmit={false}
                onSubmitEditing={() => lastNameInputRef.current?.focus()}
                autoComplete="name-given"
                label={t("First name")}
                returnKeyType="next"
                error={touchedFields.firstName && !!errors.firstName}
              />
              {touchedFields.firstName && !!errors.firstName && (
                <HelperText visible type="error">
                  {errors.firstName.message}
                </HelperText>
              )}
            </View>
          )}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <View style={styles.gap}>
              <TextInput
                dense
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                ref={lastNameInputRef}
                blurOnSubmit={false}
                onSubmitEditing={() => emailInputRef.current?.focus()}
                autoComplete="name-family"
                label={t("Last name")}
                returnKeyType="next"
                error={touchedFields.lastName && !!errors.lastName}
              />
              {touchedFields.lastName && !!errors.lastName && (
                <HelperText visible type="error">
                  {errors.lastName.message}
                </HelperText>
              )}
            </View>
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <View style={styles.gap}>
              <TextInput
                dense
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                ref={emailInputRef}
                blurOnSubmit={false}
                onSubmitEditing={() => passwordInputRef.current?.focus()}
                autoComplete="email"
                label={t("Email")}
                returnKeyType="next"
                keyboardType="email-address"
                error={touchedFields.email && !!errors.email}
              />
              {touchedFields.email && !!errors.email && (
                <HelperText visible type="error">
                  {errors.email.message}
                </HelperText>
              )}
            </View>
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <View style={styles.gap}>
              <TextInput
                dense
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                ref={passwordInputRef}
                label={t("Password")}
                secureTextEntry
                autoComplete="password-new"
                error={touchedFields.password && !!errors.password}
              />
              {touchedFields.password && !!errors.password && (
                <HelperText visible type="error">
                  {errors.password.message}
                </HelperText>
              )}
            </View>
          )}
        />
      </View>
      <Button
        mode="contained"
        onPress={handleSubmit(console.log)}
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
    paddingBottom: 48,
    justifyContent: "flex-end",
  },
  gap: {
    marginBottom: 8,
  },
});
