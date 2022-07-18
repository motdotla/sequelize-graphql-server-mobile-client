import { useMutation } from "@apollo/client";
import { REQUEST_EMAIL_VERIFICATION } from "~graphql/queries/auth";
import { Response } from "types";
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
