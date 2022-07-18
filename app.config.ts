import "dotenv/config";
import { ExpoConfig } from "@expo/config";
import { name, version } from "./package.json";

const {
  APP_NAME,
  SENTRY_ORG,
  SENTRY_PROJECT,
  SENTRY_AUTH_TOKEN,
  SENTRY_DSN,
  LOCIZE_API_KEY,
  LOCIZE_PROJECT_ID,
  ENV,
  CLIENT_ID,
  BASE_URL,
  CONTACT_EMAIL,
} = process.env;

const enableInExpoDevelopment = ENV === "development";

const config: ExpoConfig = {
  name: APP_NAME || name,
  slug: name,
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
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  plugins: ["sentry-expo"],
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
    graphqlEndpoint: `${BASE_URL}/graphql`,
    restEndpoint: `${BASE_URL}/v1`,
    email: CONTACT_EMAIL,
  },
};

export default config;
