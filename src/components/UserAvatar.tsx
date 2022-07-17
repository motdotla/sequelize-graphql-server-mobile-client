import { Avatar } from "react-native-paper";

type Props = {
  src?: string | null;
  text: string;
  size?: number;
};

export default function UserAvatar({ src, text, size = 32 }: Props) {
  if (src) {
    return <Avatar.Image source={{ uri: src }} size={size} />;
  }

  return <Avatar.Text label={text} size={size} />;
}
