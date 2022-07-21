import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

type Props = {
  message: string;
};

export default function EmptyState({ message }: Props) {
  return (
    <View style={styles.container}>
      <Text variant="titleLarge">{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
