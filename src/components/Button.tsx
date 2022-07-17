import { ComponentProps } from "react";
import { StyleSheet } from "react-native";
import { Button as RNPButton } from "react-native-paper";

type Props = ComponentProps<typeof RNPButton>;

export default function Button(props: Props) {
  return (
    <RNPButton
      theme={{ roundness: 1 }}
      contentStyle={styles.container}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
});
