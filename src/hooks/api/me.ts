import { useMutation, useQuery } from "@apollo/client";
import { useCallback } from "react";
import Toast from "react-native-root-toast";
import { FullnameInput, UserMutationResponse, UserPayload } from "types";
import { ME, REMOVE_AVATAR, UPDATE_FULLNAME } from "~graphql/queries/user";

export function useMe() {
  const { loading, data, error, refetch } = useQuery<{ me: UserPayload }>(ME);

  const onRefresh = useCallback(() => refetch(), [refetch]);

  return {
    loading,
    error,
    onRefresh,
    data: data?.me,
  };
}

export function useUpdateFullname() {
  const [mutate, { loading, error, data, reset }] = useMutation<
    {
      updateCurrentUserFullname: UserMutationResponse;
    },
    { input: FullnameInput }
  >(UPDATE_FULLNAME, {
    onCompleted: ({ updateCurrentUserFullname }) => {
      Toast.show(updateCurrentUserFullname.message);
    },
  });

  const onSubmit = useCallback(
    (input: FullnameInput) => mutate({ variables: { input } }),
    [mutate]
  );

  return {
    loading,
    error,
    reset,
    onSubmit,
    data: data?.updateCurrentUserFullname,
  };
}

export function useRemoveAvatar() {
  const [mutate, { loading, error, data, reset }] = useMutation<{
    removeCurrentUserAvatar: UserPayload;
  }>(REMOVE_AVATAR);

  const onSubmit = useCallback(() => mutate(), [mutate]);

  return {
    loading,
    error,
    reset,
    onSubmit,
    data: data?.removeCurrentUserAvatar,
  };
}
