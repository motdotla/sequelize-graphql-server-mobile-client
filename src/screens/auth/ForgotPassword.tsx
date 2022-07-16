import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput, Button, HelperText } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ForgotPasswordInput } from "types";

export default function ForgotPassword() {
  const { t } = useTranslation();

  const schema = useMemo(
    () =>
      yup
        .object({
          email: yup
            .string()
            .email(t("Invalid email address"))
            .required(t("Type your email")),
        })
        .required(),
    [t]
  );

  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<ForgotPasswordInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      contentContainerStyle={styles.contentContainer}
    >
      <Controller
        name="email"
        control={control}
        render={({ field: { onBlur, onChange, value } }) => (
          <View style={styles.gap}>
            <TextInput
              autoFocus
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              autoComplete="email"
              label={t("Email")}
              keyboardType="email-address"
              error={touchedFields.email && !!errors.email}
            />
            {touchedFields.email && !!errors.email && (
              <HelperText visible type="error">
                {errors.email?.message}
              </HelperText>
            )}
          </View>
        )}
      />
      <Button mode="contained" onPress={handleSubmit(console.log)}>
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
