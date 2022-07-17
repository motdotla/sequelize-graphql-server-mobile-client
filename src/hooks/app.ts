import { useQuery } from "@apollo/client";
import { useCallback } from "react";
import { AUTH_STATE, PREFERENCES } from "~graphql/queries/app";
import { AppPreferences, AuthState } from "types";

export function usePreferences() {
  const { data, client } = useQuery<{ preferences: AppPreferences }>(
    PREFERENCES
  );

  const preferences = data!.preferences;

  const setPreference = useCallback((key: keyof AppPreferences, value) => {
    client.writeQuery<{ preferences: AppPreferences }>({
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
  const { data } = useQuery<{ auth: AuthState }>(AUTH_STATE);

  const tokens = data?.auth;

  return {
    ...(tokens || {}),
    isLoggedIn: !!tokens,
  };
}
