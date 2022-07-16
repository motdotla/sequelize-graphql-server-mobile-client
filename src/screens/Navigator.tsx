import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from "@react-navigation/native-stack";
import { View, StatusBar } from "react-native";
import { useTheme } from "react-native-paper";
import Settings from "./Settings";
import { RootStackParamList } from "types";
import Home from "./Home";
import { useTranslation } from "react-i18next";
import { Appbar } from "react-native-paper";

function Header({ navigation, back, options }: NativeStackHeaderProps) {
  return (
    <Appbar elevated mode="center-aligned">
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={options.title} />
    </Appbar>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigator() {
  const { colors, dark } = useTheme();
  const { t } = useTranslation();
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
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            title: t("Settings"),
          }}
        />
      </Stack.Navigator>
    </View>
  );
}
