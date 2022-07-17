import { useQuery } from "@apollo/client";
import { useCallback } from "react";
import { Locale } from "types";
import { GET_LOCALES } from "~graphql/queries/user";

export default function useGetLocales() {
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
