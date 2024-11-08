import { Stack } from 'expo-router';
import React from 'react';
import 'react-native-reanimated';

export default function RootLayout() {

    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: true }} />
            <Stack.Screen name="settings" options={{ headerShown: true }} />
        </Stack>
    );
}
