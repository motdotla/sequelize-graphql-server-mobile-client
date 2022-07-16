import { useQuery } from "@apollo/client";
import { useCallback } from "react";
import { AUTH_STATE, PREFERENCES } from "~graphql/queries/app";
import { AppColorScheme, AppPreferences, AuthState } from "types";

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

export function useAuth() {
  const { data } = useQuery(AUTH_STATE);

  const tokens = data?.auth as AuthState;

  return {
    ...tokens,
    isLoggedIn: !!tokens,
  };
}
