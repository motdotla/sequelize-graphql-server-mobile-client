import { useMutation } from "@apollo/client";
import { DELETE_ACCOUNT, REQUEST_DELETE_ACCOUNT } from "~graphql/queries/auth";
import { Response } from "types";
import { useCallback } from "react";
import Toast from "react-native-root-toast";

export function useRequestDeleteAccount() {
  const [mutate, { loading, data, error, reset }] = useMutation<{
    requestDeleteAccount: Response;
  }>(REQUEST_DELETE_ACCOUNT, {
    onCompleted: ({ requestDeleteAccount }) => {
      Toast.show(requestDeleteAccount.message);
    },
  });

  const onSubmit = useCallback(() => mutate(), [mutate]);

  return {
    loading,
    error,
    reset,
    onSubmit,
    data: data?.requestDeleteAccount,
  };
}

export function useDeleteAccount() {
  const [mutate, { loading, data, error, reset }] = useMutation<
    { deleteAccount: Response },
    { token: string }
  >(DELETE_ACCOUNT, {
    onCompleted: ({ deleteAccount }) => {
      Toast.show(deleteAccount.message);
    },
  });

  const onSubmit = useCallback(
    (token: string) => mutate({ variables: { token } }),
    [mutate]
  );

  return {
    loading,
    error,
    reset,
    onSubmit,
    data: data?.deleteAccount,
  };
}
