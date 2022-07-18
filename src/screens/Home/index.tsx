import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import { ProgressBar } from "react-native-paper";
import { HomeTabParamList, IconName } from "types";
import ErrorState from "~components/ErrorState";
import createMaterialBottomTabNavigator from "~components/MD3BottomTabs/createMaterialBottomTabNavigator";
import { useMe } from "~hooks/api/me";
import Schedule from "./Schedule";
import Settings from "./Settings";

const Tab = createMaterialBottomTabNavigator<HomeTabParamList>();

export default function Home() {
  const { t } = useTranslation();
  const { loading, data, error, onRefresh } = useMe();

  if (loading) {
    return <ProgressBar indeterminate />;
  }

  if (error) {
    return <ErrorState message={error.message} onRetry={onRefresh} />;
  }

  if (data && !data.success) {
    return <ErrorState message={data.message} onRetry={onRefresh} />;
  }

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
            } else if (route.name === "Settings") {
              iconName = focused ? "cog" : "cog-outline";
            }

            return (
              <MaterialCommunityIcons size={24} color={color} name={iconName} />
            );
          },
        };
      }}
    >
      <Tab.Screen
        name="Schedule"
        component={Schedule}
        options={{ title: t("Schedule") }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          title: t("Settings"),
        }}
      />
    </Tab.Navigator>
  );
}
