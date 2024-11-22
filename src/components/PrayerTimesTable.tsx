import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppTheme } from "../hooks/useApptheme";
import { Colors } from "@/constants/Colors";
import Spacing from "@/constants/Spacing";

const useStyles = () => {
  const theme = useAppTheme();
  return StyleSheet.create({
    container: {
      marginTop: 30,
      borderRadius: Spacing.borderRadius.lg,
      marginHorizontal: 20,
      padding: 40,
      backgroundColor: Colors.white,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 12,
      width: "100%",
    },
    key: {
      fontSize: 18,
      fontWeight: "600",
      letterSpacing: 1,
      color: theme.textColor,
    },
    val: {
      fontSize: 18,
      color: theme.textColor,
      borderStyle: "dashed",
      borderRadius: 1,
      borderColor: theme.lineColor,
      borderLeftWidth: StyleSheet.hairlineWidth,
    },
  });
};

function formatTime(hour: number, minute: number): string {
  const h = String(hour > 12 ? hour - 12 : hour);
  const m = minute.toString().padStart(2, "0");
  const a = hour > 12 ? "pm" : "am";
  return `${h}:${m} ${a}`;
}

export interface Props {
  entries: { key: string; val: { hour: number; minute: number } }[];
}

export default (props: Props) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      {props.entries.map(({ key, val }, i) => {
        const isLast = i === props.entries.length - 1;
        return (
          <View
            key={key}
            style={[
              styles.row,
              i === 0 && { paddingTop: 0 },
              isLast && { paddingBottom: 0 },
            ]}
          >
            <Text style={styles.key}>{key}</Text>
            <Text style={styles.val}>{formatTime(val.hour, val.minute)}</Text>
          </View>
        );
      })}
    </View>
  );
};
