import EditEvent from "~components/EditEvent";

type Props = {
  visible: boolean;
  onDismiss: () => void;
};

export default function AddEvent({ visible, onDismiss }: Props) {
  return (
    <EditEvent visible={visible} onDismiss={onDismiss} onSubmit={console.log} />
  );
}
