import { useCallback, useState } from "react";
import Constants from "expo-constants";
import { Platform } from "react-native";
import { ImageInfo } from "expo-image-picker";
import { useAuth } from "~hooks/app";

export default function useUploadAvatar() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState(null);
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
      }

      const formData = new FormData();
      formData.append("avatar", file as Blob);

      const UPLOAD_ENDPOINT = `${Constants.manifest?.extra?.restEndpoint}/user/avatar`;
      const headers = {
        Accept: "application/json",
        authorization: accessToken ? `Bearer ${accessToken}` : "",
        client_id: Constants.manifest?.extra?.clientId,
      };

      const response = await fetch(UPLOAD_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: Platform.select({
          web: {
            ...headers,
          },
          default: {
            ...headers,
            "Content-Type": "multipart/form-data",
          },
        }) as HeadersInit,
      });
      const json = await response.json();
      setData(json);
    } catch (e) {
      setError(e as Error);
    } finally {
      setUploading(false);
    }
  }, []);

  return {
    uploading,
    upload,
    error,
    data,
  };
}
