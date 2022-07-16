import { ApolloClient, ApolloLink, HttpLink, from } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageWrapper, CachePersistor } from "apollo3-cache-persist";
import Constants from "expo-constants";
import { AuthState } from "types";
import cache from "./cache";
import { AUTH_STATE } from "./queries/app";

export const persistor = new CachePersistor({
  cache,
  storage: new AsyncStorageWrapper(AsyncStorage),
});

const httpLink = new HttpLink({
  uri: Constants.manifest?.extra?.graphqlEndpoint,
});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }: Record<string, any>) => {
    const data = cache.readQuery<{ auth: AuthState }>({ query: AUTH_STATE });

    return {
      headers: {
        ...headers,
        client_id: Constants.manifest?.extra?.clientId,
        authorization: data?.auth?.accessToken || "",
      },
    };
  });

  return forward(operation);
});

const client = new ApolloClient({
  name: Constants.manifest?.name,
  version: Constants.manifest?.version,
  cache,
  link: from([authLink, httpLink]),
});

export default client;
