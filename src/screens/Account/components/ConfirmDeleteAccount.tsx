import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { Button, Dialog, Portal, Text } from "react-native-paper";

type Props = {
  visible: boolean;
  onDismiss: () => void;
};

export default function ConfirmDeleteAccount({ visible, onDismiss }: Props) {
  const { t } = useTranslation();

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>{t("Delete your account?")}</Dialog.Title>
        <Dialog.Content>
          <Text>
            {t(
              "This action will permanently delete all of your data. You can't undo this."
            )}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button mode="contained-tonal" onPress={onDismiss}>
            {t("Cancel")}
          </Button>
          <View style={{ width: 8 }} />
          <Button mode="contained">{t("Delete")}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
