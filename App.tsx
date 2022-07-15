import * as SplashScreen from "expo-splash-screen";
import { RootSiblingParent } from "react-native-root-siblings";
import Main from "~Main";
import "~config/sentry";

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <RootSiblingParent>
      <Main />
    </RootSiblingParent>
  );
}
