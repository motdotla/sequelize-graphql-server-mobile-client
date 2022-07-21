import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from "@react-navigation/native-stack";
import { getHeaderTitle } from "@react-navigation/elements";
import { View, StatusBar } from "react-native";
import { useTheme, Appbar } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { RootStackParamList } from "types";
import { useAuth } from "~hooks/app";
import Home from "./Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import Account from "./Account";
import Notifications from "./Notifications";
import Timezones from "./Timezones";
import Locales from "./Locales";
import NewSchedule from "./NewSchedule";

function Header({ navigation, route, back, options }: NativeStackHeaderProps) {
  return (
    <Appbar mode="center-aligned">
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={getHeaderTitle(options, route.name)} />
    </Appbar>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigator() {
  const { colors, dark } = useTheme();
  const { t } = useTranslation();
  const { isLoggedIn } = useAuth();

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
        initialRouteName="Login"
        screenOptions={{
          header: (props) => <Header {...props} />,
        }}
      >
        {!isLoggedIn ? (
          <Stack.Group>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                title: t("Login"),
              }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                title: t("Register"),
              }}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{
                title: t("Forgot Password"),
              }}
            />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPassword}
              options={{
                title: t("Reset Password"),
              }}
            />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Account"
              component={Account}
              options={{
                title: t("Account"),
              }}
            />
            <Stack.Screen
              name="Notifications"
              component={Notifications}
              options={{
                title: t("Notifications"),
              }}
            />
            <Stack.Screen
              name="Timezones"
              component={Timezones}
              options={{
                headerShown: false,
                title: t("Timezones"),
              }}
            />
            <Stack.Screen
              name="Locales"
              component={Locales}
              options={{
                headerShown: false,
                title: t("Locales"),
              }}
            />
            <Stack.Screen
              name="NewSchedule"
              component={NewSchedule}
              options={{
                headerShown: false,
                title: t("New Schedule"),
              }}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </View>
  );
}
