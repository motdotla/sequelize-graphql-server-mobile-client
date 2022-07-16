import { useTranslation } from "react-i18next";
import { Button } from "react-native-paper";

export default function GoogleLogin() {
  const { t } = useTranslation();
  return (
    <Button
      mode="contained-tonal"
      buttonColor="#4285F4"
      textColor="#fff"
      onPress={() => null}
    >
      {t("Sign in with Google")}
    </Button>
  );
}
