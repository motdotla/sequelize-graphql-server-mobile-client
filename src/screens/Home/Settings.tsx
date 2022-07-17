import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { View, ScrollView, StyleSheet } from "react-native";
import { Appbar, List, Text } from "react-native-paper";
import Constants from "expo-constants";
import useMe from "~hooks/api/useMe";
import { usePreferences } from "~hooks/app";
import { HomeTabScreenProps } from "types";

export default function Settings({
  navigation,
}: HomeTabScreenProps<"Settings">) {
  const { t } = useTranslation();
  const {
    preferences: { theme },
  } = usePreferences();

  const { data } = useMe();

  const { user } = data!;

  const items = useMemo(
    () => [
      {
        key: "account",
        title: t("Account"),
        description: !user.emailVerified
          ? t("Verify your email to prevent data loss")
          : user.fullName,
        icon: "account-outline",
      },
      {
        key: "timezone",
        title: t("Timezone"),
        description: user.timezone,
        icon: "earth",
      },
      {
        key: "locale",
        title: t("Locale"),
        description: user.locale,
        icon: "alphabetical-variant",
      },
      {
        key: "notifications",
        title: t("Notifications"),
        description: t("Reminders and Push Notifications"),
        icon: "bell-outline",
      },
      {
        key: "theme",
        title: t("Theme"),
        description: t(theme!),
        icon: "theme-light-dark",
      },
      {
        key: "contact",
        title: t("Contact us"),
        description: t("Have a suggestion or problem? Send us an email"),
        icon: "email-outline",
      },
    ],
    [t, user]
  );

  const onPressItem = useCallback(
    (key: string) => () => {
      switch (key) {
        case "account": {
          navigation.navigate("Account");
          break;
        }
      }
    },
    []
  );

  return (
    <>
      <Appbar mode="center-aligned">
        <Appbar.Content title={t("Settings")} />
      </Appbar>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.container}>
          {items.map(({ key, title, description, icon }) => (
            <List.Item
              key={key}
              title={title}
              left={() => <List.Icon icon={icon} />}
              description={description}
              onPress={onPressItem(key)}
            />
          ))}
        </View>
        <View style={styles.footer}>
          <Text variant="labelSmall">{Constants.manifest?.version}</Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  footer: {
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
