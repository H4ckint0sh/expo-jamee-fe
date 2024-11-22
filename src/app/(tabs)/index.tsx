import BreakingNews from "@/components/BreakingNews";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import HorizontalItems, {
  CategoryItem,
} from "../../components/HorizontalItems";
import NewsListComponent from "../../components/NewsList";
import Spacing from "../../constants/Spacing";
import { Categories, News, NewsList } from "../../data";

const NewsScreen: React.FC = () => {
  const [news, setNews] = useState<News[]>(NewsList);

  const handleCategory = ({ id }: CategoryItem) => {
    setNews(NewsList.filter((news) => news.categoryId === id));
  };

  return (
    <SafeAreaView>
      <ScrollView
        style={{
          paddingVertical: Spacing.padding.base,
        }}
        showsVerticalScrollIndicator={false}
      >
        <BreakingNews />
        <View style={{ marginHorizontal: Spacing.margin.base }}>
          <HorizontalItems onClick={handleCategory} items={Categories} />
          <NewsListComponent newsList={news} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewsScreen;
