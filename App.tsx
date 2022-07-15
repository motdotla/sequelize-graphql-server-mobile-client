import { Suspense, useEffect, useState } from "react";
import { ProgressBar } from "react-native-paper";
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
      <Suspense fallback={<ProgressBar indeterminate />}>
        <ApolloProvider client={client}>
          <Main />
        </ApolloProvider>
      </Suspense>
    </RootSiblingParent>
  );
}
