import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Divider,
  List,
  ProgressBar,
  Text,
  Banner,
  Snackbar,
} from "react-native-paper";
import UserAvatar from "~components/UserAvatar";
import useLogout from "~hooks/api/logout";
import { useMe } from "~hooks/api/me";
import { useRequestEmailVerification } from "~hooks/api/emailVerification";
import ConfirmDeleteAccount from "./components/ConfirmDeleteAccount";
import ChangeFullname from "./components/ChangeFullname";
import ChangePhoto from "./components/ChangePhoto";

export default function Account() {
  const { t } = useTranslation();
  const { data } = useMe();
  const { loading, logout } = useLogout();
  const {
    loading: sendVerificationLoading,
    data: sendVerificationData,
    onSubmit: sendVerificationLink,
    reset,
  } = useRequestEmailVerification();
  const [openDelete, setOpenDelete] = useState(false);
  const [openEditName, setOpenEditName] = useState(false);
  const [openEditPhoto, setOpenEditPhoto] = useState(false);

  const toggleOpenDelete = useCallback(
    () => setOpenDelete((open) => !open),
    []
  );
  const toggleOpenEditName = useCallback(
    () => setOpenEditName((open) => !open),
    []
  );
  const toggleOpenEditPhoto = useCallback(
    () => setOpenEditPhoto((open) => !open),
    []
  );

  const {
    user: { socialAvatarURL, avatar, fullName, email, emailVerified },
  } = data!;

  const items = useMemo(
    () => [
      {
        key: "avatar",
        title: t("Change Profile Picture"),
      },
      {
        key: "name",
        title: t("Change Name"),
      },
      {
        key: "delete",
        title: t("Delete Account"),
      },
      {
        key: "logout",
        title: t("Log Out"),
      },
    ],
    [t]
  );

  const onPressItem = useCallback(
    (key: string) => () => {
      switch (key) {
        case "logout": {
          logout();
          break;
        }
        case "delete": {
          toggleOpenDelete();
          break;
        }
        case "name": {
          toggleOpenEditName();
          break;
        }
        case "avatar": {
          toggleOpenEditPhoto();
          break;
        }
      }
    },
    [logout]
  );

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Banner
        visible={!emailVerified}
        actions={[
          {
            label: t("Send me a verification link"),
            loading: sendVerificationLoading,
            onPress: () => sendVerificationLink(email),
          },
        ]}
      >
        {t("Verify your email address to secure your account.")}
      </Banner>
      {loading && <ProgressBar indeterminate />}
      <View style={styles.avatar}>
        <UserAvatar
          text={fullName[0]}
          src={avatar?.url || socialAvatarURL}
          size={80}
        />
        <Text variant="headlineLarge">{fullName}</Text>
        <Text>{email}</Text>
      </View>
      <Divider />
      {items.map(({ key, title }) => (
        <View key={key}>
          <List.Item title={title} onPress={onPressItem(key)} />
          <Divider />
        </View>
      ))}
      <Snackbar
        visible={!!sendVerificationData}
        onDismiss={reset}
        action={{ label: t("Dismiss"), onPress: reset }}
        duration={Snackbar.DURATION_LONG}
      >
        {sendVerificationData?.message}
      </Snackbar>
      <ConfirmDeleteAccount visible={openDelete} onDismiss={toggleOpenDelete} />
      <ChangeFullname visible={openEditName} onDismiss={toggleOpenEditName} />
      <ChangePhoto visible={openEditPhoto} onDismiss={toggleOpenEditPhoto} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },
  avatar: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
});
