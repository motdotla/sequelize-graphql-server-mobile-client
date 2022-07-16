import { useQuery } from "@apollo/client";
import { useCallback } from "react";
import { APP_PREFERENCES } from "~graphql/queries/Preferences";
import { AppColorScheme } from "types";

type AppPreferences = {
  theme: AppColorScheme;
};

export default function usePreferences() {
  const { data, client } = useQuery(APP_PREFERENCES);

  const preferences = data.preferences as AppPreferences;

  const setPreference = useCallback((key: keyof AppPreferences, value) => {
    client.writeQuery({
      query: APP_PREFERENCES,
      data: {
        preferences: {
          ...preferences,
          [key]: value,
        },
      },
    });
  }, []);

  return {
    preferences,
    setPreference,
  };
}
