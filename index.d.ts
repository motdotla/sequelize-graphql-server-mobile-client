import { ThemeOverride } from "../src/config/theme";

declare global {
  namespace ReactNativePaper {
    interface Theme extends ThemeOverride {}
  }
}
