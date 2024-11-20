import {
  ScrollView,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  Text,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import useColors from "../hooks/useColors";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Font from "../constants/Font";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { scrollTo } from "react-native-reanimated";

export type CategoryItem = {
  id: number;
  name: string;
  image?: ImageSourcePropType;
};

type Props = {
  items: CategoryItem[];
  onClick?: (item: CategoryItem) => void;
  showAddButton?: boolean;
};

const CategoryList: React.FC<Props> = ({ items, onClick, showAddButton }) => {
  const colors = useColors();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const scrollRef = useRef<ScrollView>(null);
  const itemRef = useRef<TouchableOpacity[] | null[]>([]);

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
          {items.map((item, index) =>
            item.image ? (
              <TouchableOpacity
                key={index}
                ref={(el) => (itemRef.current[index] = el)}
                onPress={() => handleSelectCategory(index)}
                style={{
                  height: 70,
                  width: 70,
                  backgroundColor: colors.primary,
                  borderRadius: Spacing.borderRadius.xxl,
                  padding: Spacing.padding.sm,
                  marginRight: Spacing.margin.base,
                }}
              >
                <Image
                  source={item.image}
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                key={item.id}
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
                    color:
                      activeIndex === index ? Colors.white : Colors.softText,
                  }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            ),
          )}
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
