import React, { useRef, useState } from "react";
import { Text, View, ViewToken } from "react-native";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import { BreakingNewsList, News, NewsList } from "../data";
import { HorizontalItem } from "./HorizontalItems";
import SliderItem from "./SliderItem";
import Pagination from "./SliderPagination";

const BreakingNews: React.FC = () => {
  const [data, setData] = useState<News[]>(BreakingNewsList);
  const [paginationIndex, setPaginationIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const ref = useAnimatedRef<Animated.FlatList<any>>();

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (
      viewableItems[0].index !== undefined &&
      viewableItems[0].index !== null
    ) {
      setPaginationIndex(viewableItems[0].index % data.length);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
    1,
  ]);

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  return (
    <>
      <Text
        style={{
          fontSize: FontSize.lg,
          fontFamily: Font["poppins-bold"],
          textTransform: "uppercase",
          marginLeft: 20,
          marginBottom: 20,
        }}
      >
        Breaking news
      </Text>
      <View>
        <Animated.FlatList
          ref={ref}
          data={data}
          onScroll={onScrollHandler}
          scrollEventThrottle={16}
          renderItem={({ item, index }) => (
            <SliderItem
              key={item.id}
              slideItem={item}
              index={index}
              scrollX={scrollX}
            />
          )}
          keyExtractor={(_, index) => `item-${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onEndReachedThreshold={0.5}
          onEndReached={() => setData([...data, ...BreakingNewsList])}
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current as any
          }
        />
      </View>
      <Pagination
        items={BreakingNewsList}
        paginationIndex={paginationIndex}
        scrollX={scrollX}
      />
    </>
  );
};

export default BreakingNews;
