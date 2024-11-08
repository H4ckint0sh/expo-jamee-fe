import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../hooks/useApptheme';

const useStyles = () => {
    const theme = useAppTheme();
    return StyleSheet.create({
        container: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        row: {
            flexDirection: 'row',
            width: 240,
            paddingVertical: 12,
        },
        key: {
            flex: 1,
            paddingVertical: 4,
            paddingHorizontal: 12,
            fontSize: 18,
            fontWeight: '600',
            textAlign: 'right',
            color: theme.textColor,
        },
        val: {
            flex: 1,
            paddingVertical: 4,
            paddingHorizontal: 12,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
        },
    });
};

export interface Props {
    entries: { key: string; val: React.ReactNode }[];
}

export default (props: Props) => {
    const styles = useStyles();

    return (
        <View style={styles.container}>
            {props.entries.map(({ key, val }) => (
                <View key={key} style={styles.row}>
                    <Text style={styles.key}>{key}</Text>
                    <View style={styles.val}>{val}</View>
                </View>
            ))}
        </View>
    );
};
