import Font from "@/constants/Font";
import FontSize from "@/constants/FontSize";
import { News } from "@/data";
import { Article } from "@/types";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

type Props = {
  slideItem: Article;
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
    <Link href={`/news/${slideItem.article_id}`} asChild>
      <TouchableOpacity activeOpacity={1}>
        <Animated.View
          style={[styles.itemWrapper, animatedStyles]}
          key={slideItem.article_id}
        >
          <Image
            source={{ uri: slideItem.article_img_url }}
            style={styles.image}
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.8)"]}
            style={styles.background}
          >
            <Text numberOfLines={2} style={styles.title}>
              {slideItem.title}
            </Text>
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  itemWrapper: {
    position: "relative",
    width: width,
    justifyContent: "center",
    alignItems: "center",
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
