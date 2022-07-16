import {
  createDrawerNavigator,
  DrawerHeaderProps,
} from "@react-navigation/drawer";
import { Appbar } from "react-native-paper";
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

export default function Schedule() {
  return (
    <Drawer.Navigator
      screenOptions={{
        header: (props) => <Header {...props} />,
        drawerType: "slide",
      }}
    >
      <Drawer.Screen name="Calendar" component={Calendar} />
    </Drawer.Navigator>
  );
}
