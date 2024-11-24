import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors"; // Assuming Colors.tint and Colors.black are defined here

export const getPrayerIcon = ({
  prayerName,
  current,
}: {
  prayerName: string;
  current: boolean;
}) => {
  const iconColor = current ? Colors.tint : Colors.black; // Set the color based on whether it's the current prayer

  switch (prayerName) {
    case "fajr":
      return current ? (
        <Ionicons name="cloudy-night" size={18} color={iconColor} />
      ) : (
        <Ionicons name="cloudy-night-outline" size={18} color={iconColor} />
      );
    case "sunrise":
      return (
        <Feather
          name="sunrise"
          size={20}
          color={iconColor} // Use iconColor for both current and not current
        />
      );
    case "dhuhr":
      return current ? (
        <Ionicons name="sunny" size={20} color={iconColor} />
      ) : (
        <Ionicons name="sunny-outline" size={20} color={iconColor} />
      );
    case "asr":
      return current ? (
        <Ionicons name="partly-sunny" size={20} color={iconColor} />
      ) : (
        <Ionicons name="partly-sunny-outline" size={20} color={iconColor} />
      );
    case "sunset":
      return (
        <Feather
          name="sunset"
          size={20}
          color={iconColor} // Use iconColor for both current and not current
        />
      );
    case "maghrib":
      return current ? (
        <Ionicons name="moon" size={16} color={iconColor} />
      ) : (
        <Ionicons name="moon-outline" size={16} color={iconColor} />
      );
    case "isha":
      return current ? (
        <Ionicons name="cloudy-night" size={18} color={iconColor} />
      ) : (
        <Ionicons name="cloudy-night-outline" size={18} color={iconColor} />
      );
    default:
      return null;
  }
};
