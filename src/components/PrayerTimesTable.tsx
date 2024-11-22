import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useAppTheme } from "../hooks/useApptheme";
import { Colors } from "@/constants/Colors";
import Spacing from "@/constants/Spacing";
import moment from "moment-timezone";
import * as Location from "expo-location";

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

function getTime(date: Date): string {
  const time = moment(date).tz("Europe/Berlin").format("h:mm A");
  return time;
}

export interface Props {
  entries: any;
}

export default (props: Props) => {
  const styles = useStyles();
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const getLocation = async () => {
    try {
      // Ask for location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // Get the user's current location
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    } catch (error) {
      Alert.alert("Error", "Failed to get location");
      console.error(error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (errorMsg) {
      Alert.alert("Error", errorMsg);
    }
    if (location) {
      console.log("location", location);
    }
  }, [errorMsg, location]);

  const includedKeys = [
    "asr",
    "dhuhr",
    "isha",
    "sunrise",
    "sunset",
    "maghrib",
    "fajr",
  ];
  const filteredPrayerTimes = Object.fromEntries(
    Object.entries(props.entries).filter(([key]) => includedKeys.includes(key)),
  );

  return (
    <View style={styles.container}>
      {Object.entries(filteredPrayerTimes).map(([key, val], i) => {
        const isLast = i === Object.keys(filteredPrayerTimes).length - 1;
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
            <Text style={styles.val}>{getTime(val as Date)}</Text>
          </View>
        );
      })}
    </View>
  );
};
