import React, { useEffect, useRef, useState } from "react";
import { Text, View, ViewToken, useWindowDimensions } from "react-native";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
  scrollTo,
} from "react-native-reanimated";
import FontSize from "../constants/FontSize";
import { BreakingNewsList, News } from "../data";
import SliderItem from "./SliderItem";
import Pagination from "./SliderPagination";
import { Article } from "@/types";

type BrewingNewsProps = {
  news: Article[];
  isLoading?: boolean;
};

const BreakingNews: React.FC<BrewingNewsProps> = ({ news }) => {
  const [data, setData] = useState<News[]>(BreakingNewsList);
  const [paginationIndex, setPaginationIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const ref = useAnimatedRef<Animated.FlatList<any>>();
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const interval = useRef<NodeJS.Timeout>();
  const offset = useSharedValue(0);
  const { width } = useWindowDimensions();

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (
      viewableItems[0]?.index !== undefined &&
      viewableItems[0]?.index !== null
    ) {
      setPaginationIndex(viewableItems[0].index % data.length);
    }
  };

  useEffect(() => {
    if (isAutoPlay === true) {
      interval.current = setInterval(() => {
        offset.value = offset.value + width;
      }, 5000);
    } else {
      clearInterval(interval.current);
    }

    return () => {
      clearInterval(interval.current);
    };
  }, [isAutoPlay, offset, width]);

  useDerivedValue(() => {
    scrollTo(ref, offset.value, 0, true);
  });

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
    1,
  ]);

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
    onMomentumEnd: (e) => {
      scrollX.value = e.contentOffset.x;
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          fontSize: FontSize.base,
          fontWeight: "600",
          marginBottom: 20,
          marginLeft: 20,
        }}
      >
        Breaking news
      </Text>
      <View style={{ justifyContent: "center" }}>
        <Animated.FlatList
          ref={ref}
          data={news}
          onScroll={onScrollHandler}
          scrollEventThrottle={16}
          renderItem={({ item, index }) => (
            <SliderItem
              key={item.article_id}
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
          onScrollEndDrag={() => setIsAutoPlay(false)}
          onScrollBeginDrag={() => setIsAutoPlay(false)}
        />
      </View>
      <Pagination
        items={BreakingNewsList}
        paginationIndex={paginationIndex}
        scrollX={scrollX}
      />
    </View>
  );
};

export default BreakingNews;
