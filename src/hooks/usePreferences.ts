import { Appearance, useColorScheme } from 'react-native';
import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';

const storage = new MMKVLoader().initialize();

export type AsrMethod = 'shafi' | 'hanafi';
export type AppTheme = 'light' | 'dark';

export function usePreferences() {
    const [asrMethod, setAsrMethod] = useMMKVStorage<AsrMethod>('pref-asr-method', storage, 'shafi');
    return {
        asrMethod,
        setAsrMethod,
        appTheme: useColorScheme() ?? 'dark',
        setAppTheme: (theme: AppTheme) => Appearance.setColorScheme(theme),
    };
}
