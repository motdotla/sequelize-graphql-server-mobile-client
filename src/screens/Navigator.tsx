import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, StatusBar } from "react-native";
import { useTheme } from "react-native-paper";
import { RootStackParamList } from "@types";
import Home from "./Home";
import Settings from "./Settings";
import Profile from "./Profile";

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
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </View>
  );
}
