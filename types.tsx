import { ComponentProps } from "react";
import { ColorSchemeName } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import type { DrawerScreenProps } from "@react-navigation/drawer";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export type AppColorScheme = ColorSchemeName | "auto";

export type DrawerParamList = {
  Calendar: undefined;
};

export type HomeTabParamList = {
  Schedule: NavigatorScreenParams<DrawerParamList>;
  Notifications: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ResetPassword: {
    token: string;
  };
  Home: NavigatorScreenParams<HomeTabParamList>;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

export type ScheduleScreenProps<T extends keyof DrawerParamList> =
  CompositeScreenProps<
    DrawerScreenProps<DrawerParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type IconName = ComponentProps<typeof Icon>["name"];

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = LoginInput & {
  firstName: string;
  lastName: string;
  timezone: string;
  locale: string;
};

export type ForgotPasswordInput = {
  email: string;
};

export type ResetPasswordInput = {
  password: string;
};

export type AppPreferences = {
  theme: AppColorScheme;
};

export type AuthState = {
  accessToken: string;
  refreshToken: string;
};
