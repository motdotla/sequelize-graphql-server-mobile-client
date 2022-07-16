import { ApolloClient } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageWrapper, CachePersistor } from "apollo3-cache-persist";
import Constants from "expo-constants";
import cache from "./cache";

export const persistor = new CachePersistor({
  cache,
  storage: new AsyncStorageWrapper(AsyncStorage),
});

const client = new ApolloClient({
  name: Constants.manifest?.name,
  version: Constants.manifest?.version,
  cache,
});

export default client;
