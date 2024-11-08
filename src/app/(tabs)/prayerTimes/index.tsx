import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { usePrayerTimes } from '../../../hooks/usePrayerTimes';
import { useAppTheme } from '../../../hooks/useApptheme';
import { usePreferences } from '../../../hooks/usePreferences';
import { Link, useRouter } from 'expo-router';
import Table from '../../../components/PrayerTimesTable';

const useStyles = () => {
    const theme = useAppTheme();
    return StyleSheet.create({
        container: {
            flex: 1,
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
        screenTitle: {
            fontSize: 42,
            fontWeight: '600',
            letterSpacing: 1,
            color: theme.textColor,
        },
        screenSubtitle: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
        },
        selectedDate: {
            fontSize: 15,
            color: theme.linkColor,
            letterSpacing: 1,
            textTransform: 'uppercase',
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

function formatDate(date: Date): string {
    const parts = [
        date.toLocaleString('en', { month: 'short', day: 'numeric', year: 'numeric' }),
        date.toLocaleString('ar-TN-u-ca-islamic', { month: 'short', day: 'numeric', year: 'numeric' }),
    ];
    return parts.join('  |  ');
}

export default function PrayerTimes() {
    const styles = useStyles();
    const theme = useAppTheme();
    const { appTheme } = usePreferences();
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const entries = usePrayerTimes(date);
    const isDateToday = date.toDateString() === new Date().toDateString();
    const router = useRouter();

    const gotoPreferences = () => {
        router.push({ pathname: '/settings' });
    };

    return (
        <View style={styles.container}>
            <View style={styles.screenContent}>
                <Text style={styles.screenTitle}>Prayer Times</Text>
                <View style={styles.screenSubtitle}>
                    <Pressable onPress={() => setOpen(true)}>
                        <Text style={styles.selectedDate}>{formatDate(date)}</Text>
                    </Pressable>
                </View>
                <Table entries={entries} />
            </View>

            <View style={styles.screenBottom}>
                <Link href="/(tabs)/prayerTimes/settings">
                    <Text style={styles.bottomLink}>SETTINGS</Text>
                </Link>
            </View>

            <DatePicker
                modal
                open={open}
                mode="date"
                theme={appTheme}
                textColor={theme.textColor}
                cancelText="Reset"
                confirmText="Select"
                date={date}
                onConfirm={(value) => {
                    setOpen(false);
                    setDate(value);
                }}
                onCancel={() => {
                    setOpen(false);
                    setDate(new Date());
                }}
            />
        </View>
    );
}
