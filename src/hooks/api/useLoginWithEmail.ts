import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import Toast from "react-native-root-toast";
import { AuthFormMutationResponse, AuthState, LoginInput } from "types";
import { AUTH_STATE } from "~graphql/queries/app";
import { LOGIN_WITH_EMAIL } from "~graphql/queries/auth";

export default function useLoginWithEmail() {
  const [mutate, { loading, data, error, reset }] = useMutation<
    { loginWithEmail: AuthFormMutationResponse },
    { input: LoginInput }
  >(LOGIN_WITH_EMAIL, {
    onCompleted: ({ loginWithEmail }) => {
      Toast.show(loginWithEmail.message);
    },
  });

  const onSubmit = useCallback(
    (input: LoginInput) =>
      mutate({
        variables: {
          input,
        },
        update(cache, { data }) {
          if (data && data.loginWithEmail.success) {
            const {
              loginWithEmail: { accessToken, refreshToken },
            } = data;
            cache.writeQuery<{ auth: AuthState }>({
              query: AUTH_STATE,
              data: {
                auth: {
                  accessToken,
                  refreshToken,
                },
              },
            });
          }
        },
      }),
    [mutate]
  );

  return {
    loading,
    error,
    onSubmit,
    reset,
    data: data?.loginWithEmail,
  };
}
