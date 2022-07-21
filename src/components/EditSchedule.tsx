import { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, FlatList, BackHandler } from "react-native";
import {
  FAB,
  HelperText,
  ProgressBar,
  Surface,
  Text,
  TextInput,
  TouchableRipple,
} from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { EventInput, ScheduleInput } from "types";
import Confirm from "./Confirm";
import EditEvent from "./EditEvent";
import EmptyState from "./EmptyState";

type Props = {
  onCancel: () => void;
  onSubmit: (input: ScheduleInput) => void;
  defaultValues: ScheduleInput;
  loading: boolean;
};

export default function EditSchedule({
  onCancel,
  onSubmit,
  defaultValues,
  loading,
}: Props) {
  const { t } = useTranslation();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [openAddEvent, setOpenAddEvent] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const openConfirm = useCallback(() => setOpenConfirmation(true), []);
  const closeConfirm = useCallback(() => setOpenConfirmation(false), []);
  const openAddEventModal = useCallback(() => setOpenAddEvent(true), []);
  const closeAddEventModal = useCallback(() => setOpenAddEvent(false), []);
  const onPressItem = useCallback((idx: number) => () => setEditIndex(idx), []);

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
          events: yup.array().min(1, t("Add an event")),
        })
        .required(),
    [t]
  );

  const {
    handleSubmit,
    control,
    formState: { errors, touchedFields, isDirty },
    reset,
  } = useForm<ScheduleInput>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "events",
  });

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (isDirty) {
          openConfirm();
          return true;
        }
        return false;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [isDirty])
  );

  const handleCancel = useCallback(() => {
    if (isDirty) {
      openConfirm();
    } else {
      onCancel();
    }
  }, [onCancel, isDirty]);

  const onDiscardEdit = useCallback(() => {
    if (editIndex !== null) {
      remove(editIndex);
      setEditIndex(null);
    }
  }, [remove, editIndex]);

  const onEdit = useCallback(
    (input: EventInput) => {
      if (editIndex !== null) {
        update(editIndex, input);
        setEditIndex(null);
      }
    },
    [update, editIndex]
  );

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  return (
    <>
      <Controller
        control={control}
        name="title"
        render={({ field: { onBlur, onChange, value } }) => (
          <TextInput
            autoFocus
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder={t("Title")}
            theme={{ roundness: 0 }}
            left={<TextInput.Icon name="close" onPress={handleCancel} />}
            right={
              <TextInput.Icon
                name="check"
                disabled={loading}
                onPress={handleSubmit(onSubmit)}
              />
            }
            error={touchedFields.title && !!errors.title}
          />
        )}
      />
      {touchedFields.title && !!errors.title && (
        <HelperText visible type="error">
          {errors.title?.message}
        </HelperText>
      )}
      {loading && <ProgressBar indeterminate />}
      <FlatList
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.container}
        data={fields}
        renderItem={({ item, index }) => (
          <TouchableRipple onPress={onPressItem(index)}>
            <Surface elevation={1} style={styles.surface}>
              <Text variant="titleMedium">{item.title}</Text>
            </Surface>
          </TouchableRipple>
        )}
        ListEmptyComponent={() => <EmptyState message={t("Add events")} />}
      />
      <FAB
        icon="calendar-today"
        style={styles.fab}
        onPress={openAddEventModal}
      />
      <EditEvent
        resetOnSubmit
        visible={openAddEvent}
        onDismiss={closeAddEventModal}
        onSubmit={append}
      />
      <EditEvent
        visible={editIndex !== null}
        defaultValues={editIndex !== null ? fields[editIndex] : undefined}
        onDismiss={onDiscardEdit}
        onSubmit={onEdit}
      />
      <Confirm
        title={t("Discard?")}
        visible={openConfirmation}
        onDismiss={closeConfirm}
        onConfirm={onCancel}
        confirmText={t("Discard")}
        cancelText={t("Cancel")}
      />
    </>
  );
}

EditSchedule.defaultProps = {
  loading: false,
  defaultValues: {
    title: "",
    events: [],
  },
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  fab: {
    position: "absolute",
    bottom: 72,
    right: 16,
    marginBottom: 16,
  },
  surface: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
