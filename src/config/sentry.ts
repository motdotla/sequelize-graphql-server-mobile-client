import * as Sentry from "sentry-expo";
import Constants from "expo-constants";

Sentry.init({
  dsn: Constants.manifest?.extra?.dsn,
  enableInExpoDevelopment: Constants.manifest?.extra?.enableInExpoDevelopment,
  debug: Constants.manifest?.extra?.sentryDebug, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});
