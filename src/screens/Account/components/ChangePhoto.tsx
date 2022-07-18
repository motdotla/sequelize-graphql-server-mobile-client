import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, List, Portal } from "react-native-paper";

type Props = {
  visible: boolean;
  onDismiss: () => void;
};
export default function ChangePhoto({ visible, onDismiss }: Props) {
  const { t } = useTranslation();

  const options = useMemo(
    () => [
      {
        key: "gallery",
        title: t("Choose from Gallery"),
        icon: "image",
      },
      {
        key: "camera",
        title: t("Take Photo"),
        icon: "camera",
      },
      {
        key: "delete",
        title: t("Remove Photo"),
        icon: "delete",
      },
    ],
    [t]
  );

  const onPressItem = useCallback((key: string) => () => console.log(key), []);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Content>
          {options.map(({ key, title, icon }) => (
            <List.Item
              key={key}
              title={title}
              left={() => <List.Icon icon={icon} />}
              onPress={onPressItem(key)}
            />
          ))}
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}
