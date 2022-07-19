import { useMutation } from "@apollo/client";
import {
  REQUEST_EMAIL_VERIFICATION,
  VERIFY_EMAIL,
} from "~graphql/queries/auth";
import { RequestFormResponse, ResetPasswordInput, Response } from "types";
import { useCallback } from "react";

export function useRequestEmailVerification() {
  const [mutate, { loading, data, reset }] = useMutation<
    { requestEmailVerification: Response },
    { email: string }
  >(REQUEST_EMAIL_VERIFICATION);

  const onSubmit = useCallback(
    (email: string) =>
      mutate({
        variables: {
          email,
        },
      }),
    [mutate]
  );
  return {
    loading,
    onSubmit,
    reset,
    data: data?.requestEmailVerification,
  };
}

export function useVerifyEmail() {
  const [mutate, { loading, data, reset, error }] = useMutation<{
    verifyEmail: RequestFormResponse;
  }>(VERIFY_EMAIL);

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
    reset,
    onSubmit,
    data: data?.verifyEmail,
  };
}
