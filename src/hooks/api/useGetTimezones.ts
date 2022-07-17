import { useQuery } from "@apollo/client";
import { useCallback } from "react";
import { Timezone } from "types";
import { GET_TIMEZONES } from "~graphql/queries/user";

export default function useGetTimezones() {
  const { loading, data, error, refetch } = useQuery<{
    getTimeZones: Timezone[];
  }>(GET_TIMEZONES);

  const onRefresh = useCallback(() => refetch(), [refetch]);

  return {
    loading,
    error,
    onRefresh,
    data: data?.getTimeZones,
  };
}
