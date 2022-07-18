import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import Toast from "react-native-root-toast";
import { AuthFormMutationResponse, AuthState, RegisterInput } from "types";
import { AUTH_STATE } from "~graphql/queries/app";
import { REGISTER_WITH_EMAIL } from "~graphql/queries/auth";

export default function useRegisterWithEmail() {
  const [mutate, { loading, data, error, reset }] = useMutation<
    { registerWithEmail: AuthFormMutationResponse },
    { input: RegisterInput }
  >(REGISTER_WITH_EMAIL, {
    onCompleted: ({ registerWithEmail }) => {
      Toast.show(registerWithEmail.message);
    },
  });

  const onSubmit = useCallback(
    (input: RegisterInput) =>
      mutate({
        variables: {
          input,
        },
        update(cache, { data }) {
          if (data && data.registerWithEmail.success) {
            const {
              registerWithEmail: { accessToken, refreshToken },
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
    data: data?.registerWithEmail,
  };
}
