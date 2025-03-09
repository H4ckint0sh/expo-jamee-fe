import BreakingNews from "@/components/BreakingNews";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import HorizontalItems from "../../components/HorizontalItems";
import NewsListComponent from "../../components/NewsList";
import Spacing from "../../constants/Spacing";
import { useAxios } from "@/hooks/useAxios";
import { Article } from "@/types";

const NewsScreen: React.FC = () => {
  const [news, setNews] = useState<Article[]>();
  const [newsWithSameCategory, setNewsWithSameCategory] = useState<Article[]>();
  const [topics, setTopics] = useState<string[]>([]);

  const { isLoading, sendRequest } = useAxios();

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    const topics = news?.reduce((acc: string[], curr: Article) => {
      if (!acc.includes(curr.topic)) {
        acc.push(curr.topic);
      }
      return acc;
    }, []);
    setTopics(topics);
  }, [news]);

  useEffect(() => {
    setNewsWithSameCategory(
      news?.filter((news: Article) => news.topic === topics[0]),
    );
  }, [topics]);

  const fetchArticles = async () => {
    try {
      const { articles } = await sendRequest(
        `${process.env.EXPO_PUBLIC_BASE_URL}/articles`,
      );
      if (!isLoading) {
        setNews(articles);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategory = (topic: string): void => {
    setNewsWithSameCategory(
      news?.filter((news: Article) => news.topic === topic),
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
        {news?.length > 0 && <BreakingNews news={news?.slice(0, 5)} />}
        <View style={{ marginHorizontal: Spacing.margin.base }}>
          <HorizontalItems onClick={handleCategory} items={topics} />
          <NewsListComponent newsList={newsWithSameCategory} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewsScreen;
