import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// import DatePicker from "react-native-date-picker";
import { usePrayerTimes } from "../../../hooks/usePrayerTimes";
import { useAppTheme } from "../../../hooks/useApptheme";
import { usePreferences } from "../../../hooks/usePreferences";
import { Link, Stack, router, useRouter } from "expo-router";
import Table from "../../../components/PrayerTimesTable";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const useStyles = () => {
  const theme = useAppTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    screenContent: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      gap: 20,
      justifyContent: "center",
    },
    screenTitle: {
      fontSize: 30,
      fontWeight: "600",
      letterSpacing: 1,
      color: theme.textColor,
    },
    screenSubtitle: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10,
    },
    selectedDate: {
      fontSize: 15,
      color: theme.linkColor,
      letterSpacing: 1,
      textTransform: "uppercase",
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
    date.toLocaleString("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    date.toLocaleString("ar-TN-u-ca-islamic", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  ];
  return parts.join("  |  ");
}

export default function PrayerTimes() {
  const styles = useStyles();
  const theme = useAppTheme();
  const { appTheme } = usePreferences();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const entries = usePrayerTimes(date);

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => null,
          headerRight: () => (
            <TouchableOpacity onPress={() => {}}>
              <Ionicons name="settings-outline" size={22} />
            </TouchableOpacity>
          ),
          title: "",
        }}
      />

      <View style={styles.container}>
        <View style={styles.screenContent}>
          <Text style={styles.screenTitle}>Alvesta</Text>
          <View style={styles.screenSubtitle}>
            <Pressable onPress={() => setOpen(true)}>
              <Text style={styles.selectedDate}>{formatDate(date)}</Text>
            </Pressable>
          </View>
          <Table entries={entries} />
        </View>

        {/* <View style={styles.screenBottom}> */}
        {/*   <Link href="/(tabs)/prayerTimes/settings"> */}
        {/*     <Text style={styles.bottomLink}>SETTINGS</Text> */}
        {/*   </Link> */}
        {/* </View> */}

        {/* <DatePicker */}
        {/*   modal */}
        {/*   open={open} */}
        {/*   mode="date" */}
        {/*   theme={appTheme} */}
        {/*   cancelText="Reset" */}
        {/*   confirmText="Select" */}
        {/*   date={date} */}
        {/*   onConfirm={(value) => { */}
        {/*     setOpen(false); */}
        {/*     setDate(value); */}
        {/*   }} */}
        {/*   onCancel={() => { */}
        {/*     setOpen(false); */}
        {/*     setDate(new Date()); */}
        {/*   }} */}
        {/* /> */}
      </View>
    </>
  );
}
