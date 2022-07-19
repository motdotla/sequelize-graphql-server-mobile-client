import { useMutation, useQuery } from "@apollo/client";
import { useCallback } from "react";
import { Timezone, UserPayload } from "types";
import { GET_TIMEZONES, UPDATE_TIMEZONE } from "~graphql/queries/user";

export function useGetTimezones() {
  const { loading, data, error, refetch } = useQuery<{
    getTimeZones: Timezone[];
  }>(GET_TIMEZONES, {
    fetchPolicy: "cache-first",
  });

  const onRefresh = useCallback(() => refetch(), [refetch]);

  return {
    loading,
    error,
    onRefresh,
    data: data?.getTimeZones,
  };
}

export function useUpdateTimezone() {
  const [mutate, { loading, data, error, reset }] = useMutation<
    { updateCurrentUserTimeZone: UserPayload },
    { timezone: string }
  >(UPDATE_TIMEZONE);

  const onSubmit = useCallback(
    (timezone: string) =>
      mutate({
        variables: {
          timezone,
        },
      }),
    [mutate]
  );

  return {
    loading,
    error,
    reset,
    onSubmit,
    data: data?.updateCurrentUserTimeZone,
  };
}
