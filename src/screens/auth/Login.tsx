import { useMemo, useRef } from "react";
import { StyleSheet, View, TextInput as RTextInput } from "react-native";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput, HelperText, Snackbar } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LoginInput, RootStackScreenProps } from "types";
import useLoginWithEmail from "~hooks/api/useLoginWithEmail";
import Button from "~components/Button";
import GoogleLogin from "./GoogleLogin";

export default function Login({ navigation }: RootStackScreenProps<"Login">) {
  const { t } = useTranslation();
  const passwordInputRef = useRef<RTextInput>(null);
  const { onSubmit, loading, data, reset } = useLoginWithEmail();

  const schema = useMemo(
    () =>
      yup
        .object({
          email: yup
            .string()
            .email(t("That email is incorrect"))
            .required(t("What's your email address?")),
          password: yup.string().required(t("What's your password?")),
        })
        .required(),
    [t]
  );

  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<LoginInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
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
          <View>
            <TextInput
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              blurOnSubmit={false}
              onSubmitEditing={() => passwordInputRef.current?.focus()}
              autoComplete="email"
              label={t("Email")}
              returnKeyType="next"
              keyboardType="email-address"
              error={touchedFields.email && !!errors.email}
            />
            <HelperText
              visible={touchedFields.email && !!errors.email}
              type="error"
            >
              {errors.email?.message}
            </HelperText>
          </View>
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field: { onBlur, onChange, value } }) => (
          <View>
            <TextInput
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              secureTextEntry
              ref={passwordInputRef}
              label={t("Password")}
              autoComplete="password"
              error={touchedFields.password && !!errors.password}
            />
            {touchedFields.password && !!errors.password && (
              <HelperText type="error" visible>
                {errors.password?.message}
              </HelperText>
            )}
          </View>
        )}
      />
      <Button
        onPress={() => navigation.navigate("ForgotPassword")}
        style={styles.buttonGap}
      >
        {t("Forgot your password?")}
      </Button>
      <Button
        loading={loading}
        disabled={loading}
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.buttonGap}
      >
        {t("Login")}
      </Button>
      <Button
        mode="contained-tonal"
        onPress={() => navigation.navigate("Register")}
        style={styles.buttonGap}
      >
        {t("Don't have an account?")}
      </Button>
      <GoogleLogin />
      <Snackbar
        onDismiss={reset}
        visible={!!data && !data.success}
        wrapperStyle={{ alignSelf: "center" }}
      >
        {data?.message}
      </Snackbar>
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
    marginBottom: 4,
  },
  buttonGap: {
    marginBottom: 8,
  },
});
