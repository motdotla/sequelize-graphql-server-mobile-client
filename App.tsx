import "react-native-gesture-handler";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { RootSiblingParent } from "react-native-root-siblings";
import { ApolloProvider } from "@apollo/client";
import Main from "~Main";
import client, { persistor } from "~graphql/client";
import "intl-pluralrules";
import "~config/sentry";
import "~config/i18n";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [clientReady, setClientReady] = useState(false);

  useEffect(() => {
    const hydrateCache = async () => {
      await persistor.restore();
      setClientReady(true);
    };

    hydrateCache();
  }, []);

  if (!clientReady) {
    return null;
  }

  return (
    <RootSiblingParent>
      <ApolloProvider client={client}>
        <Main />
      </ApolloProvider>
    </RootSiblingParent>
  );
}
