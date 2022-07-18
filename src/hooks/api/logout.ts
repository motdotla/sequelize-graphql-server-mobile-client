import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import { AuthState, Response } from "types";
import { persistor } from "~graphql/client";
import { AUTH_STATE } from "~graphql/queries/app";
import { LOGOUT } from "~graphql/queries/auth";

export default function useLogout() {
  const [mutate, { loading, client }] = useMutation<{ logout: Response }>(
    LOGOUT
  );

  const logout = useCallback(async () => {
    client.writeQuery<{ auth: AuthState | null }>({
      query: AUTH_STATE,
      data: {
        auth: null,
      },
    });
    try {
      await mutate();
    } finally {
      await client.resetStore();
      await persistor.purge();
    }
  }, [client, mutate]);

  return {
    logout,
    loading,
  };
}
