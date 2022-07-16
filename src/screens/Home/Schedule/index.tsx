import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerHeaderProps,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useTranslation } from "react-i18next";
import { Appbar, useTheme } from "react-native-paper";
import { DrawerParamList } from "types";
import Calendar from "./Calendar";

const Drawer = createDrawerNavigator<DrawerParamList>();

function Header({ navigation, options }: DrawerHeaderProps) {
  return (
    <Appbar mode="center-aligned">
      <Appbar.Action icon="menu" onPress={navigation.openDrawer} />
      <Appbar.Content title={options.title} />
      <Appbar.Action icon="dots-vertical" onPress={() => null} />
    </Appbar>
  );
}

function Sidebar(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function Schedule() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <Sidebar {...props} />}
      screenOptions={{
        header: (props) => <Header {...props} />,
        drawerType: "slide",
        drawerStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Drawer.Screen
        name="Calendar"
        component={Calendar}
        options={{
          title: t("Calendar"),
        }}
      />
    </Drawer.Navigator>
  );
}
