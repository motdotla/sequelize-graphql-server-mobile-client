import { Text, Provider as PaperProvider } from "react-native-paper";
import theme from "@config/theme";

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <Text>My App</Text>
    </PaperProvider>
  );
}
