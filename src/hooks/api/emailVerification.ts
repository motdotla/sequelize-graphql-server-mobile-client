import { useMutation } from "@apollo/client";
import Toast from "react-native-root-toast";
import {
  REQUEST_EMAIL_VERIFICATION,
  VERIFY_EMAIL,
} from "~graphql/queries/auth";
import { RequestFormResponse, Response } from "types";
import { useCallback } from "react";
import { ME } from "~graphql/queries/user";

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
  const [mutate, { loading, data, reset, error }] = useMutation<
    {
      verifyEmail: RequestFormResponse;
    },
    { token: string }
  >(VERIFY_EMAIL, {
    onCompleted: ({ verifyEmail }) => {
      Toast.show(verifyEmail.message);
    },
  });

  const onSubmit = useCallback(
    (token: string) =>
      mutate({
        variables: {
          token,
        },
        refetchQueries: [ME],
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
