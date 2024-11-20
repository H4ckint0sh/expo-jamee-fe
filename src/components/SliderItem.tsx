import React from "react";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, View, Text, Image, StyleSheet } from "react-native";
import { News } from "@/data";
import FontSize from "@/constants/FontSize";
import Font from "@/constants/Font";

type Props = {
  slideItem: News;
  index: number;
  scrollX: SharedValue<number>;
};

const { width } = Dimensions.get("screen");

const SliderItem = ({ slideItem, index, scrollX }: Props) => {
  const animatedStyles = useAnimatedStyle((): any => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-width * 0.15, 0, width * 0.15],
            Extrapolation.CLAMP,
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.9, 1, 0.9],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });
  return (
    <Animated.View
      style={[styles.itemWrapper, animatedStyles]}
      key={slideItem.id}
    >
      <Image source={slideItem.image} style={styles.image} />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={styles.background}
      >
        <Text numberOfLines={2} style={styles.title}>
          {slideItem.title}
        </Text>
      </LinearGradient>
    </Animated.View>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  itemWrapper: {
    position: "relative",
    width: width,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  image: {
    width: width - 60,
    height: 180,
    borderRadius: 20,
  },
  title: {
    fontSize: FontSize.base,
    fontFamily: Font["poppins-semiBold"],
    color: "#fff",
  },
  background: {
    position: "absolute",
    left: 30,
    top: 0,
    width: width - 60,
    height: 180,
    borderRadius: 20,
    padding: 20,
    justifyContent: "flex-end",
  },
});
