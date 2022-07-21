import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput, HelperText, Banner } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "~components/Button";
import { ResetPasswordInput, RootStackScreenProps } from "types";
import { useResetPassword } from "~hooks/api/forgotPassword";

export default function ResetPassword({
  route,
  navigation,
}: RootStackScreenProps<"ResetPassword">) {
  const { t } = useTranslation();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { loading, data, onSubmit } = useResetPassword();
  const token = route.params?.token;

  const schema = useMemo(
    () =>
      yup
        .object({
          password: yup
            .string()
            .required(t("Type your new password"))
            .min(6, ({ min }) =>
              t("Password must be at least {{min}} characters long", { min })
            ),
          token: yup
            .string()
            .required(t("The link you followed may be broken.")),
        })
        .required(),
    [t]
  );

  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<ResetPasswordInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      password: "",
      token,
    },
  });

  return (
    <>
      {data && (
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
          name="password"
          control={control}
          render={({ field: { value, onBlur, onChange } }) => (
            <View style={styles.gap}>
              <TextInput
                autoFocus
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                secureTextEntry={secureTextEntry}
                label={t("New Password")}
                autoComplete="password-new"
                right={
                  <TextInput.Icon
                    name={secureTextEntry ? "eye" : "eye-off"}
                    onPress={() => setSecureTextEntry(!secureTextEntry)}
                  />
                }
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
              {!!errors.token && (
                <HelperText visible={!!errors.token} type="error">
                  {errors.token?.message}
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
          {t("Change my password")}
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
