import { Appearance, useColorScheme } from "react-native";
import * as SecureStore from "expo-secure-store";
import React from "react";

export type AsrMethod = "shafi" | "hanafi";
export type AppTheme = "light" | "dark";

async function setPreference(key: string, value: string) {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error(`Error setting ${key}:`, error);
  }
}

async function getPreference<T>(key: string, defaultValue: T): Promise<T> {
  try {
    const value = await SecureStore.getItemAsync(key);
    return value ? (JSON.parse(value) as T) : defaultValue;
  } catch (error) {
    console.error(`Error getting ${key}:`, error);
    return defaultValue;
  }
}

export function usePreferences() {
  const [asrMethod, setAsrMethodState] = React.useState<AsrMethod>("shafi");

  React.useEffect(() => {
    (async () => {
      const savedAsrMethod = await getPreference<AsrMethod>(
        "pref-asr-method",
        "shafi",
      );
      setAsrMethodState(savedAsrMethod);
    })();
  }, []);

  const setAsrMethod = async (method: AsrMethod) => {
    setAsrMethodState(method);
    await setPreference("pref-asr-method", JSON.stringify(method));
  };

  const appTheme = useColorScheme() ?? "dark";

  const setAppTheme = async (theme: AppTheme) => {
    // NOTE: `Appearance.setColorScheme()` is not a real API. Managing theme preferences
    // should involve saving the preference and applying it in your app UI.
    await setPreference("pref-app-theme", JSON.stringify(theme));
  };

  return {
    asrMethod,
    setAsrMethod,
    appTheme,
    setAppTheme,
  };
}
