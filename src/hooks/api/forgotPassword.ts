import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import {
  ForgotPasswordInput,
  RequestFormResponse,
  ResetPasswordInput,
} from "types";
import { REQUEST_PASSWORD_RESET } from "~graphql/queries/auth";

export function useForgotPassword() {
  const [mutate, { loading, data, error, reset }] = useMutation<
    {
      requestPasswordReset: RequestFormResponse;
    },
    { email: string }
  >(REQUEST_PASSWORD_RESET);

  const onSubmit = useCallback(
    ({ email }: ForgotPasswordInput) =>
      mutate({
        variables: {
          email,
        },
      }),
    [mutate]
  );

  return {
    loading,
    error,
    onSubmit,
    reset,
    data: data?.requestPasswordReset,
  };
}

export function useResetPassword() {
  const [mutate, { loading, data, error, reset }] = useMutation<
    {
      resetPassword: RequestFormResponse;
    },
    { input: ResetPasswordInput }
  >(REQUEST_PASSWORD_RESET);

  const onSubmit = useCallback(
    (input: ResetPasswordInput) =>
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
    data: data?.resetPassword,
  };
}
