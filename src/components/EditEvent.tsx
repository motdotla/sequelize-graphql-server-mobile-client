import { useCallback, useEffect, useMemo, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  StyleSheet,
  View,
  TextInput as RNTextInput,
} from "react-native";
import {
  Button,
  HelperText,
  Modal,
  Portal,
  TextInput,
  useTheme,
} from "react-native-paper";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { EventInput } from "types";

type Props = {
  onDismiss: () => void;
  onSubmit: (input: EventInput) => void;
  defaultValues: EventInput;
  loading: boolean;
  visible: boolean;
  resetOnSubmit: boolean;
  closeButtonText?: string;
};

export default function EditEvent({
  visible,
  onDismiss,
  onSubmit,
  loading,
  defaultValues,
  resetOnSubmit,
  closeButtonText,
}: Props) {
  const { t } = useTranslation();
  const titleRef = useRef<RNTextInput | null>(null);
  const { colors } = useTheme();
  const schema = useMemo(
    () =>
      yup
        .object({
          title: yup
            .string()
            .trim()
            .min(3, ({ min }) =>
              t("Title must be at least {{min}} characters", { min })
            )
            .max(100, ({ max }) =>
              t("Title must be at most {{max}} characters", { max })
            )
            .required(t("What's the title?")),
        })
        .required(),
    [t]
  );

  const {
    control,
    handleSubmit,
    formState: { touchedFields, errors },
    reset,
  } = useForm<EventInput>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onDiscard = useCallback(() => {
    reset(defaultValues);
    onDismiss();
  }, [defaultValues, onDismiss]);

  const onSave = handleSubmit((values) => {
    onSubmit(values);
    if (resetOnSubmit) {
      reset(defaultValues);
      titleRef.current?.focus();
    }
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        style={styles.contentContainer}
      >
        <View style={{ backgroundColor: colors.background }}>
          <ScrollView keyboardShouldPersistTaps="always">
            <Controller
              control={control}
              name="title"
              render={({ field: { onBlur, onChange, value } }) => (
                <TextInput
                  autoFocus
                  ref={titleRef}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  placeholder={t("Event Title")}
                  theme={{ roundness: 0 }}
                  error={touchedFields.title && !!errors.title}
                />
              )}
            />
            {touchedFields.title && !!errors.title && (
              <HelperText visible type="error">
                {errors.title?.message}
              </HelperText>
            )}
          </ScrollView>
          <View style={styles.footer}>
            <Button mode="contained-tonal" onPress={onDiscard}>
              {closeButtonText || t("Discard")}
            </Button>
            <View style={styles.gap} />
            <Button
              mode="contained"
              onPress={onSave}
              loading={loading}
              disabled={loading}
            >
              {t("Save")}
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}

EditEvent.defaultProps = {
  loading: false,
  resetOnSubmit: false,
  defaultValues: {
    title: "",
  },
};

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: "flex-end",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 8,
  },
  gap: {
    width: 8,
  },
});
