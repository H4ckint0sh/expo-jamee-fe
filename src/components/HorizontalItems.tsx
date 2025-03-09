import { ScrollView, TouchableOpacity, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import useColors from "../hooks/useColors";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Font from "../constants/Font";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { scrollTo } from "react-native-reanimated";
import { Article } from "@/types";

type Props = {
  items: string[];
  onClick?: (topic: string) => void; // onClick prop
  showAddButton?: boolean;
};

const CategoryList: React.FC<Props> = ({ items, onClick, showAddButton }) => {
  const colors = useColors();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const scrollRef = useRef<ScrollView>(null);
  const itemRef = useRef<any[] | null[]>([]);

  const handleSelectCategory = (index: number) => {
    const selected = itemRef.current[index];
    setActiveIndex(index);
    onClick?.(items[index]);

    selected?.measure((x) => {
      scrollRef.current?.scrollTo({ x: x, y: 0, animated: true });
    });
  };

  return (
    <View style={{ flexDirection: "column" }}>
      <Text
        style={{
          fontSize: FontSize.base,
          fontFamily: Font["poppins-bold"],
          fontWeight: "600",
          marginBottom: 20,
        }}
      >
        Trending Right Now
      </Text>

      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <>
          {showAddButton && <AddButton rounded={false} />}
          {items?.map((topic, index) => (
            <TouchableOpacity
              key={`item-${index}`}
              ref={(el) => (itemRef.current[index] = el)}
              onPress={() => handleSelectCategory(index)}
              style={{
                paddingHorizontal: Spacing.padding.lg,
                paddingVertical: Spacing.margin.base,
                borderRadius: Spacing.borderRadius.base,
                marginRight: Spacing.margin.base,
                borderWidth: 1,
                backgroundColor:
                  activeIndex === index ? Colors.tint : colors.background,
                borderColor:
                  activeIndex === index ? Colors.tint : colors.border,
              }}
            >
              <Text
                style={{
                  fontSize: FontSize.sm,
                  fontWeight: "600",
                  color: activeIndex === index ? Colors.white : Colors.softText,
                }}
              >
                {topic}
              </Text>
            </TouchableOpacity>
          ))}
        </>
      </ScrollView>
    </View>
  );
};
type AddButtonProps = {
  rounded: boolean;
};

const AddButton: React.FC<AddButtonProps> = ({ rounded = false }) => {
  const colors = useColors();
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: colors.lightBackground,
          marginRight: Spacing.margin.base,
          justifyContent: "center",
          alignItems: "center",
        },
        rounded
          ? {
              height: 70,
              width: 70,
              padding: Spacing.padding.sm,
              borderRadius: Spacing.borderRadius.base,
            }
          : {
              paddingVertical: Spacing.padding.sm,
              paddingHorizontal: Spacing.padding.base,
              borderRadius: Spacing.borderRadius.lg,
            },
      ]}
    >
      <Ionicons name="add" size={rounded ? FontSize.lg : FontSize.sm} />
    </TouchableOpacity>
  );
};

export default CategoryList;
