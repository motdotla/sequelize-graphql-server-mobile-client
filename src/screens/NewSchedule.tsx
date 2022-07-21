import { RootStackScreenProps } from "types";
import EditSchedule from "~components/EditSchedule";

export default function NewSchedule({
  navigation,
}: RootStackScreenProps<"NewSchedule">) {
  return <EditSchedule onCancel={navigation.goBack} onSubmit={console.log} />;
}
