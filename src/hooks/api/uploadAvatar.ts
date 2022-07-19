import { useCallback, useState } from "react";
import Constants from "expo-constants";
import { Platform } from "react-native";
import { ImageInfo } from "expo-image-picker";
import * as mime from "mime";
import Toast from "react-native-root-toast";
import { useApolloClient } from "@apollo/client";
import { useAuth } from "~hooks/app";
import { UserPayload } from "types";
import { USER_AVATAR_FRAGMENT } from "~graphql/queries/user";

export default function useUploadAvatar() {
  const [uploading, setUploading] = useState(false);
  const client = useApolloClient();
  const { accessToken } = useAuth();

  const upload = useCallback(async ({ uri }: ImageInfo) => {
    setUploading(true);
    try {
      let file;
      if (Platform.OS === "web") {
        const img = await fetch(uri);
        const blob = await img.blob();
        const mimeStartAt = uri.indexOf("image/");
        const mimeEndAt = uri.indexOf(";");
        const mimetype = uri.slice(mimeStartAt, mimeEndAt);

        file = new File([blob], "avatar", {
          type: mimetype,
        });
      } else {
        file = {
          uri,
          type: mime.getType(uri),
          name: uri.split("/").pop(),
        };
      }

      const formData = new FormData();
      formData.append("avatar", file as Blob);

      const UPLOAD_ENDPOINT = `${Constants.manifest?.extra?.restEndpoint}/user/avatar`;

      const response = await fetch(UPLOAD_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          authorization: accessToken ? `Bearer ${accessToken}` : "",
          client_id: Constants.manifest?.extra?.clientId,
        },
      });
      const { user, success, message } = (await response.json()) as UserPayload;
      if (success) {
        client.writeFragment({
          id: `User:${user.id}`,
          fragment: USER_AVATAR_FRAGMENT,
          data: {
            avatar: {
              url: user.avatar,
              thumbnail: user.avatar,
            },
          },
        });
      } else {
        throw new Error(message);
      }
    } catch (e) {
      Toast.show((e as Error).message);
    } finally {
      setUploading(false);
    }
  }, []);

  return {
    uploading,
    upload,
  };
}
