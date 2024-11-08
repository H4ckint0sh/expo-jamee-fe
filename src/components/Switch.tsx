import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useAppTheme } from '../hooks/useApptheme';

const useStyles = () => {
    const theme = useAppTheme();
    return StyleSheet.create({
        text: {
            color: theme.linkColor,
            fontSize: 18,
        },
    });
};

export interface Props<T> {
    value: T;
    entries: { value: T; label: string }[];
    onChange: (value: T) => void;
}

export default function <T>({ value, entries, onChange }: Props<T>) {
    const styles = useStyles();
    const idx = entries.findIndex(e => e.value === value);
    const val = entries[idx];

    const onPressHandler = () => {
        const nextIdx = (idx + 1) % entries.length;
        onChange(entries[nextIdx].value);
    };

    return (
        <Pressable onPress={onPressHandler}>
            <Text style={styles.text}>{val.label}</Text>
        </Pressable>
    );
}
