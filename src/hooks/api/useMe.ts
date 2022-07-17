import { useQuery } from "@apollo/client";
import { useCallback } from "react";
import { UserPayload } from "types";
import { ME } from "~graphql/queries/user";

export default function useMe() {
  const { loading, data, error, refetch } = useQuery<{ me: UserPayload }>(ME);

  const onRefresh = useCallback(() => refetch(), [refetch]);

  return {
    loading,
    error,
    onRefresh,
    data: data?.me,
  };
}
