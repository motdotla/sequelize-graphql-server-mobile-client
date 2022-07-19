import "dotenv/config";
import { ExpoConfig } from "@expo/config";
import { name, version } from "./package.json";

const {
  APP_NAME,
  APP_SCHEME,
  SENTRY_ORG,
  SENTRY_PROJECT,
  SENTRY_AUTH_TOKEN,
  SENTRY_DSN,
  LOCIZE_API_KEY,
  LOCIZE_PROJECT_ID,
  ENV,
  CLIENT_ID,
  API_BASE_URL,
  CONTACT_EMAIL,
  ANDROID_SCHEME,
  ANDROID_HOST,
} = process.env;

const enableInExpoDevelopment = ENV === "development";

const config: ExpoConfig = {
  name: APP_NAME || name,
  slug: name,
  scheme: APP_SCHEME,
  version: version,
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#1976d2",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
    },
    intentFilters: [
      {
        action: "VIEW",
        autoVerify: false,
        data: [{ scheme: ANDROID_SCHEME, host: ANDROID_HOST }],
        category: ["BROWSABLE", "DEFAULT"],
      },
    ],
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  plugins: [
    "sentry-expo",
    [
      "expo-image-picker",
      {
        photosPermission:
          "Allow $(PRODUCT_NAME) to access your gallery to share photos with your team.",
        cameraPermission:
          "Allow $(PRODUCT_NAME) to access your camera to share images with your team.",
      },
    ],
  ],
  hooks: {
    postPublish: [
      {
        file: "sentry-expo/upload-sourcemaps",
        config: {
          organization: SENTRY_ORG,
          project: SENTRY_PROJECT,
          authToken: SENTRY_AUTH_TOKEN,
        },
      },
    ],
  },
  extra: {
    enableInExpoDevelopment,
    sentryDebug: enableInExpoDevelopment,
    dsn: SENTRY_DSN,
    locizeApiKey: LOCIZE_API_KEY,
    locizeProjectId: LOCIZE_PROJECT_ID,
    clientId: CLIENT_ID,
    graphqlEndpoint: `${API_BASE_URL}/graphql`,
    restEndpoint: `${API_BASE_URL}/v1`,
    email: CONTACT_EMAIL,
    webPrefix: `${ANDROID_SCHEME}://${ANDROID_HOST}`,
  },
};

export default config;
