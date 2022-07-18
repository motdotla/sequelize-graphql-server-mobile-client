import { useMemo, useRef } from "react";
import { StyleSheet, View, TextInput as RTextInput } from "react-native";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput, HelperText } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as Localization from "expo-localization";
import Button from "~components/Button";
import { RegisterInput } from "types";
import useRegisterWithEmail from "~hooks/api/registerWithEmail";

export default function Register() {
  const { t } = useTranslation();
  const lastNameInputRef = useRef<RTextInput>(null);
  const emailInputRef = useRef<RTextInput>(null);
  const passwordInputRef = useRef<RTextInput>(null);

  const { loading, onSubmit } = useRegisterWithEmail();

  const schema = useMemo(
    () =>
      yup
        .object({
          firstName: yup
            .string()
            .required(t("What's your first name?"))
            .min(1, t("Your name is too short")),
          lastName: yup
            .string()
            .required(t("What's your last name?"))
            .min(1, t("Your name is too short")),
          email: yup
            .string()
            .email(t("That email is incorrect"))
            .required(t("What's your email address?")),
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
      locale: Localization.locale,
      timezone: Localization.timezone,
    },
  });

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      contentContainerStyle={styles.contentContainer}
    >
      <Controller
        name="firstName"
        control={control}
        render={({ field: { onBlur, onChange, value } }) => (
          <View style={styles.gap}>
            <TextInput
              autoFocus
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              blurOnSubmit={false}
              onSubmitEditing={() => lastNameInputRef.current?.focus()}
              autoCapitalize="words"
              autoComplete="name-given"
              label={t("First name")}
              returnKeyType="next"
              error={touchedFields.firstName && !!errors.firstName}
            />
            {touchedFields.firstName && !!errors.firstName && (
              <HelperText
                visible={touchedFields.firstName && !!errors.firstName}
                type="error"
              >
                {errors.firstName?.message}
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
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              ref={lastNameInputRef}
              blurOnSubmit={false}
              onSubmitEditing={() => emailInputRef.current?.focus()}
              autoCapitalize="words"
              autoComplete="name-family"
              label={t("Last name")}
              returnKeyType="next"
              error={touchedFields.lastName && !!errors.lastName}
            />
            {touchedFields.lastName && !!errors.lastName && (
              <HelperText
                visible={touchedFields.lastName && !!errors.lastName}
                type="error"
              >
                {errors.lastName?.message}
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
              <HelperText
                visible={touchedFields.email && !!errors.email}
                type="error"
              >
                {errors.email?.message}
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
              <HelperText
                visible={touchedFields.password && !!errors.password}
                type="error"
              >
                {errors.password?.message}
              </HelperText>
            )}
          </View>
        )}
      />
      <Button
        mode="contained"
        loading={loading}
        disabled={loading}
        onPress={handleSubmit(onSubmit)}
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
    paddingBottom: 72,
    justifyContent: "flex-end",
  },
  gap: {
    marginBottom: 8,
  },
});
