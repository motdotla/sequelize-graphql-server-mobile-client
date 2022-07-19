import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, FlatList } from "react-native";
import { RadioButton, Searchbar } from "react-native-paper";
import { RootStackScreenProps, Timezone } from "types";
import ErrorState from "~components/ErrorState";
import { useGetTimezones, useUpdateTimezone } from "~hooks/api/timezones";
import { useMe } from "~hooks/api/me";

const keyExtractor = (item: Timezone) => item.timeZone;

export default function Timezones({
  navigation,
}: RootStackScreenProps<"Timezones">) {
  const { t } = useTranslation();
  const { loading, data, error, onRefresh } = useGetTimezones();
  const { loading: submitting, onSubmit } = useUpdateTimezone();
  const { data: me } = useMe();
  const [search, setSearch] = useState("");

  const {
    user: { timezone },
  } = me!;

  const onPressItem = useCallback((value: string) => () => onSubmit(value), []);

  const renderItem = useCallback(
    ({ item: { timeZone } }) => {
      return (
        <RadioButton.Item
          label={timeZone}
          value={timeZone}
          status={timeZone === timezone ? "checked" : "unchecked"}
          onPress={onPressItem(timeZone)}
        />
      );
    },
    [timezone]
  );

  if (error) {
    return <ErrorState message={error.message} onRetry={onRefresh} />;
  }

  return (
    <View style={styles.container}>
      <Searchbar
        autoFocus
        value={search}
        onChangeText={setSearch}
        placeholder={t("Timezone")}
        icon="arrow-left"
        onIconPress={navigation.goBack}
        theme={{ roundness: 0 }}
      />
      <FlatList
        data={data?.filter((item) =>
          item.timeZone.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )}
        refreshing={loading || submitting}
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
