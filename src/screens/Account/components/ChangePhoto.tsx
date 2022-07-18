import {
  launchCameraAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
  requestCameraPermissionsAsync,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, List, Portal } from "react-native-paper";
import Toast from "react-native-root-toast";

type Props = {
  visible: boolean;
  onDismiss: () => void;
};

export default function ChangePhoto({ visible, onDismiss }: Props) {
  const { t } = useTranslation();

  const pickImage = async () => {
    const status = await requestMediaLibraryPermissionsAsync();

    if (!status.granted) {
      Toast.show(
        t("Sorry, we need permissions for accessing photos to make this work!")
      );
    } else {
      const result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        console.log(result);
      }
    }
  };

  const takePhoto = async () => {
    const status = await requestCameraPermissionsAsync();

    if (!status.granted) {
      Toast.show(
        t("Sorry, we need permissions for accessing camera to make this work!")
      );
    } else {
      const result = await launchCameraAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!result.cancelled) {
        console.log(result);
      }
    }
  };

  const options = useMemo(
    () => [
      {
        key: "gallery",
        title: t("Choose from Gallery"),
        icon: "image",
        onPress: pickImage,
      },
      {
        key: "camera",
        title: t("Take Photo"),
        icon: "camera",
        onPress: takePhoto,
      },
      {
        key: "delete",
        title: t("Remove Photo"),
        icon: "delete",
        onPress: () => null,
      },
    ],
    [t]
  );

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Content>
          {options.map(({ key, title, icon, onPress }) => (
            <List.Item
              key={key}
              title={title}
              left={() => <List.Icon icon={icon} />}
              onPress={onPress}
            />
          ))}
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}
