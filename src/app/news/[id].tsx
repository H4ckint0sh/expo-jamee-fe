import { Stack, router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Article } from "@/types";
import { useAxios } from "@/hooks/useAxios";
import FontSize from "@/constants/FontSize";
import { Colors } from "@/constants/Colors";

type Props = {};

const NewsDetails = (props: Props) => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [article, setArticle] = useState<Article>();

  const { isLoading, sendRequest } = useAxios();
  useEffect(() => {
    fetchArticle();
  }, []);

  const fetchArticle = async () => {
    try {
      const { article } = await sendRequest(
        `${process.env.EXPO_PUBLIC_BASE_URL}/articles/${id}`,
      );
      if (!isLoading) {
        setArticle(article);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={22} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => {}}>
              <Ionicons name="heart-outline" size={22} />
            </TouchableOpacity>
          ),
          title: "",
        }}
      />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{article?.title}</Text>
        <Text style={styles.date}>{article?.created_at}</Text>
        <Image
          style={styles.image}
          source={{ uri: article?.article_img_url }}
        />
        <Text style={styles.body}>{article?.body}</Text>
      </ScrollView>
    </>
  );
};

export default NewsDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: FontSize.base,
    fontWeight: "600",
    color: Colors.black,
  },
  date: {
    fontSize: FontSize.sm,
    color: Colors.softText,
    paddingTop: 20,
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
  body: {
    fontSize: FontSize.base,
    color: Colors.black,
    paddingVertical: 10,
    lineHeight: 24,
  },
});
