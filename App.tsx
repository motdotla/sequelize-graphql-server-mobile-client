import * as SplashScreen from "expo-splash-screen";
import Main from "~Main";
import "~config/sentry";

SplashScreen.preventAutoHideAsync();

export default function App() {
  return <Main />;
}
