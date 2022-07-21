import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

type Props = {
  title: string;
  message?: string;
  visible: boolean;
  onDismiss: () => void;
  onConfirm: () => void;
  cancelText?: string;
  confirmText?: string;
};
export default function Confirm({
  title,
  message,
  visible,
  onConfirm,
  onDismiss,
  cancelText,
  confirmText,
}: Props) {
  const { t } = useTranslation();

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>{title}</Dialog.Title>
        {!!message && (
          <Dialog.Content>
            <Text>{message}</Text>
          </Dialog.Content>
        )}
        <Dialog.Actions>
          <View>
            <Button mode="contained-tonal" onPress={onDismiss}>
              {cancelText || t("No")}
            </Button>
          </View>
          <View>
            <Button mode="contained" onPress={onConfirm}>
              {confirmText || t("Yes")}
            </Button>
          </View>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
