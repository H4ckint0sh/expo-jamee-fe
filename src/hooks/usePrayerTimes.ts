import { forDate } from "@thani-sh/prayer-time-lk";
import { usePreferences } from "./usePreferences";

export function getPrayerTimes(date: Date, asrMethod = "shafi") {
  const times = forDate(date);
  const entries = [
    { key: "Fajr", val: times.fajr },
    { key: "Sunrise", val: times.sunrise },
    { key: "Dhuhr", val: times.dhuhr },
    { key: "Asr", val: times.asr },
    { key: "Maghrib", val: times.maghrib },
    { key: "Isha", val: times.isha },
  ];
  if (asrMethod === "hanafi") {
    entries[3] = { key: "Asr", val: times.asr_hanafi };
  }
  return entries;
}

export function usePrayerTimes(date: Date) {
  const { asrMethod } = usePreferences();
  return getPrayerTimes(date, asrMethod);
}
