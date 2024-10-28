import { Stack } from 'expo-router';
import React from 'react';
import 'react-native-reanimated';

export default function RootLayout() {

    return (
        <Stack>
            <Stack.Screen name="news" options={{ headerShown: true }} />
            <Stack.Screen name="details" options={{ headerShown: true }} />
        </Stack>
    );
}
