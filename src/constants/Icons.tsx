import { Ionicons } from "@expo/vector-icons";

export const icon = {
  index: ({ color, focused }: { color: string; focused: boolean }) =>
    focused ? (
      <Ionicons name="newspaper" size={24} color={color} />
    ) : (
      <Ionicons name="newspaper-outline" size={24} color={color} />
    ),
  calendar: ({ color, focused }: { color: string; focused: boolean }) =>
    focused ? (
      <Ionicons name="calendar" size={25} color={color} />
    ) : (
      <Ionicons name="calendar-outline" size={25} color={color} />
    ),
  prayerTimes: ({ color, focused }: { color: string; focused: boolean }) =>
    focused ? (
      <Ionicons name="moon" size={22} color={color} />
    ) : (
      <Ionicons name="moon-outline" size={22} color={color} />
    ),
  profile: ({ color, focused }: { color: string; focused: boolean }) =>
    focused ? (
      <Ionicons name="person" size={24} color={color} />
    ) : (
      <Ionicons name="person-outline" size={24} color={color} />
    ),
};
