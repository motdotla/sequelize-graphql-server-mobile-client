import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput, HelperText, Banner } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "~components/Button";
import * as yup from "yup";
import { ForgotPasswordInput, RootStackScreenProps } from "types";
import { useForgotPassword } from "~hooks/api/forgotPassword";

export default function ForgotPassword({
  navigation,
}: RootStackScreenProps<"ForgotPassword">) {
  const { t } = useTranslation();
  const { loading, onSubmit, data } = useForgotPassword();

  const schema = useMemo(
    () =>
      yup
        .object({
          email: yup
            .string()
            .email(t("That email is incorrect"))
            .required(t("What's your email address?")),
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
    <>
      {!!data && (
        <Banner
          visible
          actions={[
            {
              label: t("Back to Login"),
              onPress: () => navigation.navigate("Login"),
            },
          ]}
        >
          {data.message}
        </Banner>
      )}
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
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          loading={loading}
          disabled={loading}
        >
          {t("Continue")}
        </Button>
      </ScrollView>
    </>
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
