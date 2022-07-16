import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import { AuthFormMutationResponse, LoginInput } from "types";
import { LOGIN_WITH_EMAIL } from "~graphql/queries/auth";

export default function useLoginWithEmail() {
  const [mutate, { loading, data, error, reset }] = useMutation<
    { loginWithEmail: AuthFormMutationResponse },
    { input: LoginInput }
  >(LOGIN_WITH_EMAIL);

  const onSubmit = useCallback(
    (input: LoginInput) =>
      mutate({
        variables: {
          input,
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
