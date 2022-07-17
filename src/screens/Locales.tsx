import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, FlatList } from "react-native";
import { ProgressBar, RadioButton, Searchbar } from "react-native-paper";
import { Locale, RootStackScreenProps } from "types";
import ErrorState from "~components/ErrorState";
import useGetLocales from "~hooks/api/useGetLocales";
import useMe from "~hooks/api/useMe";

const keyExtractor = (item: Locale) => item.code;

export default function Locales({
  navigation,
}: RootStackScreenProps<"Locales">) {
  const { t } = useTranslation();
  const { loading, data, error, onRefresh } = useGetLocales();
  const { data: me } = useMe();
  const [search, setSearch] = useState("");

  const {
    user: { locale },
  } = me!;

  const onPressItem = useCallback(
    (value: string) => () => console.log(value),
    []
  );

  const renderItem = useCallback(
    ({ item: { code, name } }) => {
      return (
        <RadioButton.Item
          label={name}
          value={code}
          status={locale === code ? "checked" : "unchecked"}
          onPress={onPressItem(code)}
        />
      );
    },
    [locale]
  );

  if (loading) {
    return <ProgressBar indeterminate />;
  }

  if (error) {
    return <ErrorState message={error.message} onRetry={onRefresh} />;
  }

  return (
    <View style={styles.container}>
      <Searchbar
        autoFocus
        value={search}
        placeholder={t("Search")}
        onChangeText={setSearch}
        icon="arrow-left"
        onIconPress={navigation.goBack}
        theme={{ roundness: 0 }}
      />
      <FlatList
        data={data}
        initialNumToRender={10}
        keyboardShouldPersistTaps="always"
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
