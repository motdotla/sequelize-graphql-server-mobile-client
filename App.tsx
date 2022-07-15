import { Suspense } from "react";
import { ProgressBar } from "react-native-paper";
import * as SplashScreen from "expo-splash-screen";
import { RootSiblingParent } from "react-native-root-siblings";
import Main from "~Main";
import "intl-pluralrules";
import "~config/sentry";
import "~config/i18n";

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <RootSiblingParent>
      <Suspense fallback={<ProgressBar indeterminate />}>
        <Main />
      </Suspense>
    </RootSiblingParent>
  );
}
