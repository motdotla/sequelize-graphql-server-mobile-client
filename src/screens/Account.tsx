import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import { Divider, List, ProgressBar } from "react-native-paper";
import UserAvatar from "~components/UserAvatar";
import useLogout from "~hooks/api/useLogout";
import useMe from "~hooks/api/useMe";

export default function Account() {
  const { t } = useTranslation();
  const { data } = useMe();
  const { loading, logout } = useLogout();

  const {
    user: { socialAvatarURL, avatar, fullName },
  } = data!;

  const items = useMemo(
    () => [
      {
        key: "delete",
        title: t("Delete account"),
      },
      {
        key: "logout",
        title: t("Log out"),
      },
    ],
    []
  );

  const onPressItem = useCallback(
    (key: string) => () => {
      switch (key) {
        case "logout": {
          logout();
          break;
        }
      }
    },
    [logout]
  );

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      {loading && <ProgressBar indeterminate />}
      <View style={styles.avatar}>
        <UserAvatar
          text={fullName[0]}
          src={avatar?.url || socialAvatarURL}
          size={80}
        />
      </View>
      <Divider />
      {items.map(({ key, title }) => (
        <>
          <List.Item key={key} title={title} onPress={onPressItem(key)} />
          <Divider />
        </>
      ))}
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
