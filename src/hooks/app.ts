import { useQuery } from "@apollo/client";
import { useCallback } from "react";
import { AppColorScheme } from "~config/theme";
import { APP_PREFERENCES } from "~graphql/queries/Preferences";

type AppPreferences = {
  theme: AppColorScheme;
};

export default function usePreferences() {
  const { data, client } = useQuery(APP_PREFERENCES);

  const preferences = data.preferences as AppPreferences;

  const setTheme = useCallback((theme: AppColorScheme) => {
    client.writeQuery({
      query: APP_PREFERENCES,
      data: {
        preferences: {
          ...preferences,
          theme,
        },
      },
    });
  }, []);

  return {
    preferences,
    setTheme,
  };
}
