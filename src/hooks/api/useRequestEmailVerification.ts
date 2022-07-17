import { useMutation } from "@apollo/client";
import { REQUEST_EMAIL_VERIFICATION } from "~graphql/queries/auth";
import { Response } from "types";
import { useCallback } from "react";
import Toast from "react-native-root-toast";

export default function useRequestEmailVerification() {
  const [mutate, { loading, data }] = useMutation<
    { requestEmailVerification: Response },
    { email: string }
  >(REQUEST_EMAIL_VERIFICATION, {
    onCompleted: ({ requestEmailVerification }) => {
      Toast.show(requestEmailVerification.message);
    },
  });

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
    data: data?.requestEmailVerification,
  };
}
