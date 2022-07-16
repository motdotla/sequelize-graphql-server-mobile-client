import Schedule from "./Schedule";
import Account from "./Account";
import createMaterialBottomTabNavigator from "~components/MD3BottomTabs/createMaterialBottomTabNavigator";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { HomeTabParamList, IconName } from "types";

const Tab = createMaterialBottomTabNavigator<HomeTabParamList>();

export default function Home() {
  return (
    <Tab.Navigator
      initialRouteName="Schedule"
      backBehavior="initialRoute"
      sceneAnimationType="shifting"
      screenOptions={({ route }) => {
        return {
          tabBarIcon: ({ focused, color }) => {
            let iconName: IconName = "information";

            if (route.name === "Schedule") {
              iconName = focused ? "calendar-clock" : "calendar-clock-outline";
            } else if (route.name === "Account") {
              iconName = focused ? "account" : "account-outline";
            }

            return (
              <MaterialCommunityIcons size={24} color={color} name={iconName} />
            );
          },
        };
      }}
    >
      <Tab.Screen name="Schedule" component={Schedule} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
}
