import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { RouteParams } from '../../../types';
import Table from '../../../components/PrayerSettingsTable';
import Switch from '../../../components/Switch';
import { AppTheme, AsrMethod, usePreferences } from '../../../hooks/usePreferences';
import { useAppTheme } from '../../../hooks/useApptheme';
import { useNavigation, useRouter } from 'expo-router';

const useStyles = () => {
    const theme = useAppTheme();
    return StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.pageColor,
        },
        screenContent: {
            flex: 1,
            flexDirection: 'column',
            marginBottom: -40,
            alignItems: 'center',
            justifyContent: 'center',
        },
        screenBottom: {
            marginBottom: 40,
        },
        bottomLink: {
            fontSize: 15,
            color: theme.linkColor,
            letterSpacing: 1,
        },
    });
};

export const ASR_METHODS: { value: AsrMethod; label: string }[] = [
    { value: 'shafi', label: 'Shafi, ...' },
    { value: 'hanafi', label: 'Hanafi' },
];

export const APP_THEMES: { value: AppTheme; label: string }[] = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
];


export default () => {
    const styles = useStyles();
    const { goBack } = useNavigation();

    const preferences = usePreferences();

    const changeAsrMethod = (value: AsrMethod) => {
        preferences.setAsrMethod(value);
    };
    const toggleAsrMethod = (
        <Switch<AsrMethod> value={preferences.asrMethod} entries={ASR_METHODS} onChange={changeAsrMethod} />
    );

    const changeAppTheme = (value: AppTheme) => {
        preferences.setAppTheme(value);
    };
    const toggleAppTheme = (
        <Switch<AppTheme> value={preferences.appTheme} entries={APP_THEMES} onChange={changeAppTheme} />
    );

    const entries = [
        { key: 'Calculation', val: toggleAsrMethod },
        { key: 'Theme', val: toggleAppTheme },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.screenContent}>
                <Table entries={entries} />
            </View>
            <View style={styles.screenBottom}>
                <Pressable onPress={goBack}>
                    <Text style={styles.bottomLink}>BACK</Text>
                </Pressable>
            </View>
        </View>
    );
};
