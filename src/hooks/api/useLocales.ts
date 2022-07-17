import { useMutation, useQuery } from "@apollo/client";
import { useCallback } from "react";
import { Locale, UserPayload } from "types";
import { GET_LOCALES, UPDATE_LOCALE } from "~graphql/queries/user";

export function useGetLocales() {
  const { loading, data, error, refetch } = useQuery<{ getLocales: Locale[] }>(
    GET_LOCALES
  );

  const onRefresh = useCallback(() => refetch(), [refetch]);

  return {
    loading,
    error,
    onRefresh,
    data: data?.getLocales,
  };
}

export function useUpdateLocale() {
  const [mutate, { loading, data, error, reset }] = useMutation<
    { updateCurrentUserLocale: UserPayload },
    { locale: string }
  >(UPDATE_LOCALE);

  const onSubmit = useCallback(
    (locale: string) =>
      mutate({
        variables: {
          locale,
        },
      }),
    [mutate]
  );

  return {
    loading,
    error,
    reset,
    onSubmit,
    data: data?.updateCurrentUserLocale,
  };
}
