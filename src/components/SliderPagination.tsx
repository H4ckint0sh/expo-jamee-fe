import { StyleSheet, View } from "react-native";
import React from "react";

import Animated, { SharedValue } from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import { Article } from "@/types";

type Props = {
  items: Article[];
  paginationIndex: number;
  scrollX: SharedValue<number>;
};

const Pagination = ({ items, paginationIndex }: Props) => {
  return (
    <View style={styles.container}>
      {items?.map((_, index) => (
        <Animated.View
          style={[
            styles.dot,
            {
              backgroundColor:
                index === paginationIndex ? Colors.tint : Colors.darkGrey,
            },
          ]}
          key={index}
        />
      ))}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    height: 8,
    width: 8,
    marginHorizontal: 2,
    borderRadius: 8,
  },
});
