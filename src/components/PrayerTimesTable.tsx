import { Colors } from "@/constants/Colors";
import { getPrayerIcon } from "@/constants/PrayTimesIcons";
import Spacing from "@/constants/Spacing";
import { Prayer, PrayerTimes } from "@/shared/prayTimes/Adhan";
import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const useStyles = () => {
  return StyleSheet.create({
    container: {
      borderWidth: 1,
      borderRadius: Spacing.borderRadius.lg,
      borderColor: Colors.border,
      padding: 20,
      backgroundColor: Colors.white,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 10,
      width: "100%",
      height: 40,
      borderWidth: 1,
      borderRadius: Spacing.borderRadius.base,
      borderColor: Colors.border,
      marginVertical: 4,
      paddingHorizontal: 10,
    },
    key: {
      fontSize: 16,
      textTransform: "capitalize",
      letterSpacing: 1,
      color: Colors.black,
    },
    nameContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    val: {
      fontSize: 14,
      fontWeight: "600",
      color: Colors.black,
      borderRadius: 1,
      marginRight: 10,
    },
    icon: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "center",
      width: 25,
      marginRight: 10,
    },
    countdown: {
      color: Colors.tint,
      fontWeight: "600",
      fontSize: 14,
    },
  });
};

function getTime(date: Date): string {
  return moment(date).tz("Europe/Berlin").format("HH:mm");
}

function formatTimeRemaining(durationInMs: number): string {
  const duration = moment.duration(durationInMs);
  const hours = Math.floor(duration.asHours());
  const minutes = duration.minutes();
  const seconds = duration.seconds();
  return `${hours}h ${minutes}m ${seconds}s`;
}

export interface Props {
  prayerTimes: PrayerTimes;
}

export default ({ prayerTimes }: Props) => {
  const styles = useStyles();
  const [currentPrayer, setCurrentPrayer] = useState<Prayer | null>(null);
  const [nextPrayer, setNextPrayer] = useState<Prayer | null>(null);
  const [nextPrayerTime, setNextPrayerTime] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState<string | null>(null);

  const includedKeys = [
    "fajr",
    "sunrise",
    "dhuhr",
    "asr",
    "maghrib",
    "isha",
    "sunset",
  ];
  const filteredPrayerTimes = Object.fromEntries(
    Object?.entries(prayerTimes || {}).filter(([key]) =>
      includedKeys.includes(key),
    ),
  );

  useEffect(() => {
    if (prayerTimes?.currentPrayer) {
      const current = prayerTimes.currentPrayer();
      const next = prayerTimes.nextPrayer();
      const nextTime = prayerTimes.timeForPrayer(next);

      setCurrentPrayer(current);
      setNextPrayer(next);
      setNextPrayerTime(nextTime);
    }
  }, [prayerTimes]);

  useEffect(() => {
    if (!nextPrayerTime) return;

    const intervalId = setInterval(() => {
      const now = new Date();
      const timeDifference = nextPrayerTime.getTime() - now.getTime();
      if (timeDifference <= 0) {
        clearInterval(intervalId); // Stop countdown when time reaches 0
        setTimeLeft("Time for next prayer!");
        return;
      }
      setTimeLeft(formatTimeRemaining(timeDifference));
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [nextPrayerTime]);

  return (
    <View style={styles.container}>
      {Object?.entries(filteredPrayerTimes).map(([key, val]) => {
        const isCurrent = currentPrayer?.toLowerCase() === key;
        return (
          <View key={key} style={[styles.row]}>
            <View style={styles.nameContainer}>
              <Text style={styles.icon}>
                {getPrayerIcon({ prayerName: key, current: isCurrent })}
              </Text>
              <Text style={[styles.key]}>{key}</Text>
            </View>
            {isCurrent && timeLeft && (
              <Text style={styles.countdown}>{timeLeft}</Text>
            )}
            <Text style={styles.val}>{getTime(val as Date)}</Text>
          </View>
        );
      })}
    </View>
  );
};
