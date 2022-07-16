import {
  createDrawerNavigator,
  DrawerHeaderProps,
} from "@react-navigation/drawer";
import { Appbar } from "react-native-paper";
import Schedule from "./Schedule";

const Drawer = createDrawerNavigator();

function Header({ navigation, options }: DrawerHeaderProps) {
  return (
    <Appbar mode="center-aligned">
      <Appbar.Action icon="menu" onPress={navigation.openDrawer} />
      <Appbar.Content title={options.title} />
    </Appbar>
  );
}

export default function AppDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}
    >
      <Drawer.Screen name="Calendar" component={Schedule} />
    </Drawer.Navigator>
  );
}
