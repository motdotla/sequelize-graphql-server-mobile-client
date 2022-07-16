import Schedule from "./Schedule";
import Account from "./Account";
import { HomeTabParamList, IconName } from "@types";
import createMaterialBottomTabNavigator from "~components/MD3BottomTabs/createMaterialBottomTabNavigator";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

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
            let iconName: IconName;

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
