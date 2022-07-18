import { useEffect, useMemo, useRef } from "react";
import { View, TextInput as RNTextInput } from "react-native";
import { useTranslation } from "react-i18next";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FullnameInput } from "types";
import { useMe, useUpdateFullname } from "~hooks/api/me";

type Props = {
  visible: boolean;
  onDismiss: () => void;
};

export default function ChangeFullname({ visible, onDismiss }: Props) {
  const { t } = useTranslation();
  const { data } = useMe();
  const lastNameRef = useRef<RNTextInput>(null);

  const {
    user: { firstName, lastName },
  } = data!;

  const schema = useMemo(
    () =>
      yup
        .object({
          firstName: yup.string().min(1).max(100).required(),
          lastName: yup.string().min(1).max(100).required(),
        })
        .required(),
    [t]
  );

  const {
    control,
    formState: { touchedFields, errors },
    handleSubmit,
  } = useForm<FullnameInput>({
    defaultValues: {
      firstName,
      lastName,
    },
    resolver: yupResolver(schema),
  });

  const { loading, onSubmit, data: updatedData, reset } = useUpdateFullname();

  useEffect(() => {
    if (updatedData?.success) {
      reset();
      onDismiss();
    }
  }, [updatedData]);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Content>
          <View style={{ marginBottom: 8 }}>
            <Controller
              control={control}
              name="firstName"
              render={({ field: { value, onBlur, onChange } }) => (
                <TextInput
                  label={t("First name")}
                  autoCapitalize="words"
                  autoComplete="name-given"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => lastNameRef.current?.focus()}
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={touchedFields.firstName && !!errors.firstName}
                />
              )}
            />
          </View>
          <Controller
            control={control}
            name="lastName"
            render={({ field: { value, onBlur, onChange } }) => (
              <TextInput
                ref={lastNameRef}
                label={t("Last name")}
                autoCapitalize="words"
                autoComplete="name-family"
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                error={touchedFields.lastName && !!errors.lastName}
              />
            )}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button mode="contained-tonal" onPress={onDismiss}>
            {t("Cancel")}
          </Button>
          <View style={{ width: 8 }} />
          <Button
            mode="contained"
            loading={loading}
            disabled={loading}
            onPress={handleSubmit(onSubmit)}
          >
            {t("Save")}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
