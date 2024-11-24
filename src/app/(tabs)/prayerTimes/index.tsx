import React, { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  SafeAreaView,
} from "react-native";
// import DatePicker from "react-native-date-picker";
import { useAppTheme } from "../../../hooks/useApptheme";
import { usePreferences } from "../../../hooks/usePreferences";
import { Link, Stack, router, useRouter } from "expo-router";
import Table from "../../../components/PrayerTimesTable";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { usePrayerTimes } from "../../../hooks/usePrayerTimes";
import * as Location from "expo-location";

import {
  Coordinates,
  CalculationMethod,
  PrayerTimes as PrayTimesCalculator,
  Prayer,
  Qibla,
  HighLatitudeRule,
  Shafaq,
} from "../../../shared/prayTimes/Adhan";
import Spacing from "@/constants/Spacing";
import moment from "moment";

const useStyles = () => {
  const theme = useAppTheme();
  return StyleSheet.create({
    container: {},
    screenContent: {
      marginHorizontal: Spacing.margin.base,
    },
    locationName: {
      fontSize: 18,
      width: "100%",
      textAlign: "center",
      fontWeight: "600",
      letterSpacing: 1,
      marginTop: 20,
    },
    buttonContainer: {
      display: "flex",
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      paddingHorizontal: 30,
      marginVertical: 20,
    },
    button: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: Colors.softText,
    },
    dates: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    date: {
      fontSize: 16,
      letterSpacing: 1,
      fontWeight: "600",
      textTransform: "capitalize",
      marginVertical: 3,
    },
    screenBottom: {
      marginBottom: 40,
    },
    bottomLink: {
      fontSize: 15,
      letterSpacing: 1,
    },
    textContainer: {
      backgroundColor: "#FFF3CD",
      padding: 10,
      marginVertical: 20,
      borderRadius: Spacing.borderRadius.lg,
      borderWidth: 1,
      borderColor: "#FFEEBA",
    },
    attentionText: {
      color: "#856404",
      fontSize: 14,
    },
    bold: {
      fontWeight: "bold",
    },
  });
};

function formatDate(date: Date): string[] {
  const parts = [
    date.toLocaleString("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    new Intl.DateTimeFormat("ar-IQ-u-ca-islamic", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date),
    new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date),
  ];
  return parts;
}

export default function PrayerTimes() {
  const styles = useStyles();
  const theme = useAppTheme();
  const { appTheme } = usePreferences();
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [locationName, setLocationName] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [prayerTimes, setPrayerTimes] = useState<PrayTimesCalculator>();

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
      // Reverse geocode to get the location name
      const [place] = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      if (place) {
        const name = `${place.city || place.region || ""}, ${place.country || ""}`;
        setLocationName(name);
      } else {
        setLocationName("Unknown location");
      }

      setLocation(currentLocation);
    } catch (error) {
      Alert.alert("Error", "Failed to get location");
      console.error(error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const coordinates = new Coordinates(
    location?.coords.latitude,
    location?.coords.longitude,
  );
  var params = CalculationMethod.Tehran();
  params.shafaq = Shafaq.Ahmer;

  useEffect(() => {
    if (location) {
      const prayerTimes = new PrayTimesCalculator(
        coordinates,
        selectedDate ? selectedDate : new Date(),
        params,
      );
      setPrayerTimes(prayerTimes);
    }
  }, [location, locationName, selectedDate]);

  const handlePreviousDay = () => {
    setSelectedDate((prevDate) => moment(prevDate).subtract(1, "day").toDate());
  };

  const handleNextDay = () => {
    setSelectedDate((prevDate) => moment(prevDate).add(1, "day").toDate());
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.screenContent}>
          <Text style={styles.locationName}>{locationName}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handlePreviousDay} style={styles.button}>
              <Ionicons
                name="arrow-back-circle-outline"
                size={40}
                color={Colors.softText}
              />
            </TouchableOpacity>
            <View style={styles.dates}>
              {formatDate(selectedDate || new Date()).map((date, i) => (
                <Text key={i} style={styles.date}>
                  {date}
                </Text>
              ))}
            </View>
            <TouchableOpacity onPress={handleNextDay} style={styles.button}>
              <Ionicons
                name="arrow-forward-circle-outline"
                size={40}
                color={Colors.softText}
              />
            </TouchableOpacity>
          </View>
          <Table prayerTimes={prayerTimes} />
          <View style={styles.textContainer}>
            <Text style={styles.attentionText}>
              ⚠️ **Attention:** Due to the complexity of calculations and
              potential variances in location accuracy, please allow for a
              possible{" "}
              <Text style={styles.bold}>10-minute margin of error</Text> in the
              displayed prayer times. Always verify with your local mosque or
              trusted source for precise timings.
            </Text>
          </View>
        </ScrollView>

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
      </SafeAreaView>
    </>
  );
}
