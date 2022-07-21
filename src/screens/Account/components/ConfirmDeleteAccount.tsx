import { useEffect } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { useRequestDeleteAccount } from "~hooks/api/deleteAccount";

type Props = {
  visible: boolean;
  onDismiss: () => void;
};

export default function ConfirmDeleteAccount({ visible, onDismiss }: Props) {
  const { t } = useTranslation();
  const { loading, onSubmit, data, reset } = useRequestDeleteAccount();

  useEffect(() => {
    if (data?.success) {
      reset();
      onDismiss();
    }
  }, [data]);

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
          <View>
            <Button mode="contained-tonal" onPress={onDismiss}>
              {t("Cancel")}
            </Button>
          </View>
          <View>
            <Button
              mode="contained"
              loading={loading}
              disabled={loading}
              onPress={onSubmit}
            >
              {t("Delete")}
            </Button>
          </View>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
