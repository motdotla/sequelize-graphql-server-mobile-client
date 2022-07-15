import * as SplashScreen from "expo-splash-screen";
import Main from "~Main";

SplashScreen.preventAutoHideAsync();

export default function App() {
  return <Main />;
}
