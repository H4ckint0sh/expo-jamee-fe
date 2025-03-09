import { Stack, router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Article } from "@/types";
import { useAxios } from "@/hooks/useAxios";

type Props = {};

const NewsDetails = (props: Props) => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [articel, setArticel] = useState<Article>();

  const { isLoading, sendRequest } = useAxios();
  useEffect(() => {
    fetchArticle();
  }, []);

  const fetchArticle = async () => {
    try {
      const { articles: article } = await sendRequest(
        `${process.env.EXPO_PUBLIC_BASE_URL}/articles${id}`,
      );
      if (!isLoading) {
        setArticel(article);
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
      <View>
        <Text>{articel?.title}</Text>
      </View>
    </>
  );
};

export default NewsDetails;

const styles = StyleSheet.create({});
