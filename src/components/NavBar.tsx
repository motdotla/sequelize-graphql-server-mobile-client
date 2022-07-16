import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Appbar } from "react-native-paper";

export default function NavBar({ navigation, back }: NativeStackHeaderProps) {
  return (
    <Appbar elevated mode="center-aligned">
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title="My App" />
    </Appbar>
  );
}
