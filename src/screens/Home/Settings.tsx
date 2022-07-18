import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { View, ScrollView, StyleSheet, Platform } from "react-native";
import { Appbar, List, Text } from "react-native-paper";
import Constants from "expo-constants";
import * as MailComposer from "expo-mail-composer";
import capitalize from "lodash.capitalize";
import { useMe } from "~hooks/api/me";
import { usePreferences } from "~hooks/app";
import { HomeTabScreenProps } from "types";
import ThemePicker from "./components/ThemePicker";

export default function Settings({
  navigation,
}: HomeTabScreenProps<"Settings">) {
  const { t } = useTranslation();
  const [openThemePicker, setOpenThemePicker] = useState(false);

  const toggleThemePicker = useCallback(
    () => setOpenThemePicker((open) => !open),
    []
  );

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
          ? t("Verify your email to secure your account")
          : user.fullName,
        icon: "account-outline",
        onPress: () => navigation.navigate("Account"),
      },
      {
        key: "timezone",
        title: t("Timezone"),
        description: user.timezone,
        icon: "earth",
        onPress: () => navigation.navigate("Timezones"),
      },
      {
        key: "locale",
        title: t("Locale"),
        description: user.locale,
        icon: "alphabetical-variant",
        onPress: () => navigation.navigate("Locales"),
      },
      {
        key: "notifications",
        title: t("Notifications"),
        description: t("Reminders and Push Notifications"),
        icon: "bell-outline",
        onPress: () => navigation.navigate("Notifications"),
      },
      {
        key: "theme",
        title: t("Theme"),
        description: capitalize(t(theme!)),
        icon: "theme-light-dark",
        onPress: toggleThemePicker,
      },
      {
        key: "contact",
        title: t("Contact Us"),
        description: t("Have a suggestion or problem? Send us an email"),
        icon: "email-outline",
        onPress: () =>
          MailComposer.composeAsync({
            recipients: [Constants.manifest?.extra?.email],
            subject: `[${Platform.OS}]`,
          }),
      },
    ],
    [t, user, theme]
  );

  return (
    <>
      <Appbar mode="center-aligned">
        <Appbar.Content title={t("Settings")} />
      </Appbar>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.container}>
          {items.map(({ key, title, description, icon, onPress }) => (
            <List.Item
              key={key}
              title={title}
              left={() => <List.Icon icon={icon} />}
              description={description}
              onPress={onPress}
            />
          ))}
        </View>
        <View style={styles.footer}>
          <Text variant="labelSmall">{Constants.manifest?.version}</Text>
        </View>
        <ThemePicker visible={openThemePicker} onDismiss={toggleThemePicker} />
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
