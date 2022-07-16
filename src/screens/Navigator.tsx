import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from "@react-navigation/native-stack";
import { getHeaderTitle } from "@react-navigation/elements";
import { View, StatusBar } from "react-native";
import { useTheme } from "react-native-paper";
import { RootStackParamList } from "types";
import Home from "./Home";
import { Appbar } from "react-native-paper";

function Header({ navigation, route, back, options }: NativeStackHeaderProps) {
  return (
    <Appbar elevated mode="center-aligned">
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={getHeaderTitle(options, route.name)} />
    </Appbar>
  );
}

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
          header: (props) => <Header {...props} />,
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </View>
  );
}
