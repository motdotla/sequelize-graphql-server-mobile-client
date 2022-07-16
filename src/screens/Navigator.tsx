import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, StatusBar } from "react-native";
import { useTheme } from "react-native-paper";
import { RootStackParamList } from "@types";
import Settings from "./Settings";
import NavBar from "~components/NavBar";
import Home from "./Home";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigator() {
  const { colors, dark } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <StatusBar
        backgroundColor={colors.background}
        barStyle={dark ? "light-content" : "dark-content"}
      />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: (props) => <NavBar {...props} />,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </View>
  );
}
