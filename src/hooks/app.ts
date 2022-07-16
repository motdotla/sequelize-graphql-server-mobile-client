import { useQuery } from "@apollo/client";
import { useCallback } from "react";
import { PREFERENCES } from "~graphql/queries/app";
import { AppColorScheme } from "types";

type AppPreferences = {
  theme: AppColorScheme;
};

export function usePreferences() {
  const { data, client } = useQuery(PREFERENCES);

  const preferences = data.preferences as AppPreferences;

  const setPreference = useCallback((key: keyof AppPreferences, value) => {
    client.writeQuery({
      query: PREFERENCES,
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
