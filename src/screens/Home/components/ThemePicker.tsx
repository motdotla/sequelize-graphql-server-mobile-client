import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, Portal, RadioButton } from "react-native-paper";
import { AppColorScheme } from "types";
import { usePreferences } from "~hooks/app";

type Props = {
  visible: boolean;
  onDismiss: () => void;
};

const options: AppColorScheme[] = ["auto", "light", "dark"];

export default function ThemePicker({ visible, onDismiss }: Props) {
  const { t } = useTranslation();
  const {
    preferences: { theme },
    setPreference,
  } = usePreferences();
  const onValueChange = useCallback(
    (value) => setPreference("theme", value),
    []
  );

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} theme={{ roundness: 1 }}>
        <Dialog.Title>{t("Theme")}</Dialog.Title>
        <Dialog.Content>
          <RadioButton.Group value={theme!} onValueChange={onValueChange}>
            {options.map((key) => (
              <RadioButton.Item
                label={t(key as string)}
                value={key as string}
              />
            ))}
          </RadioButton.Group>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}
