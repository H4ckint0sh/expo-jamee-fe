import BreakingNews from "@/components/BreakingNews";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import HorizontalItems, {
  CategoryItem,
} from "../../components/HorizontalItems";
import NewsListComponent from "../../components/NewsList";
import Spacing from "../../constants/Spacing";
import { Categories, News, NewsList } from "../../data";
import { useAxios } from "@/hooks/useAxios";
import { Article } from "@/types";

const NewsScreen: React.FC = () => {
  const [news, setNews] = useState<Article[]>();
  const [newsWithSameCategory, setNewsWithSameCategory] = useState<Article[]>();

  const { isLoading, sendRequest } = useAxios();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { articles } = await sendRequest(
        `http://localhost:8000/api/articles`,
      );

      if (!isLoading) {
        setNews(articles);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategory = ({ id }: CategoryItem) => {
    setNewsWithSameCategory(
      news.filter((news: Article) => news.article_id === id),
    );
  };

  return (
    <SafeAreaView>
      <ScrollView
        style={{
          paddingVertical: Spacing.padding.base,
        }}
        showsVerticalScrollIndicator={false}
      >
        <BreakingNews news={news?.slice(0, 5)} />
        <View style={{ marginHorizontal: Spacing.margin.base }}>
          <HorizontalItems onClick={handleCategory} items={Categories} />
          <NewsListComponent newsList={newsWithSameCategory} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewsScreen;
