import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Dot from "../../../components/Dot";
import HorizontalItems, {
  HorizontalItem,
} from "../../../components/HorizontalItems";
import Font from "../../../constants/Font";
import FontSize from "../../../constants/FontSize";
import Spacing from "../../../constants/Spacing";
import { Categories, News, NewsList } from "../../../data";
import useColors from "../../../hooks/useColors";
import BreakingNews from "@/components/BreakingNews";

const NewsScreen: React.FC = () => {
  const colors = useColors();
  const router = useRouter();

  const [news, setNews] = useState<News[]>(NewsList);

  const handleCategory = ({ id }: HorizontalItem) => {
    setNews(NewsList.filter((news) => news.categoryId === id));
  };

  return (
    <SafeAreaView>
      <BreakingNews />
      <View
        style={{
          padding: Spacing.padding.base,
        }}
      >
        <HorizontalItems onClick={handleCategory} items={Categories} />
        <ScrollView
          style={{
            paddingVertical: Spacing.padding.base,
          }}
          showsVerticalScrollIndicator={false}
        >
          {news.map((newsItem) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/details",
                  params: { news: JSON.stringify(newsItem) },
                })
              }
              key={newsItem.id}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: Spacing.padding.base,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
              }}
            >
              <View
                style={{
                  width: "65%",
                  paddingRight: Spacing.padding.sm,
                }}
              >
                <Text
                  style={{
                    fontSize: FontSize.base,
                    fontFamily: Font["poppins-semiBold"],
                    color: colors.secondary,
                    textTransform: "uppercase",
                  }}
                >
                  {
                    Categories.find(
                      (category) => category.id === newsItem.categoryId,
                    )?.name
                  }
                </Text>
                <Text
                  style={{
                    fontSize: FontSize.lg,
                    fontFamily: Font["poppins-semiBold"],
                    marginVertical: Spacing.margin.sm,
                  }}
                  numberOfLines={3}
                >
                  {newsItem.title}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: Spacing.margin.base,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: FontSize.sm,
                      color: colors.textGray,
                    }}
                  >
                    {newsItem.time}
                  </Text>
                  <Dot />
                  <Text
                    style={{
                      fontSize: FontSize.sm,
                      color: colors.textGray,
                    }}
                  >
                    {newsItem.length}
                  </Text>
                </View>
              </View>
              <View>
                <Image
                  style={{
                    height: 110,
                    width: 130,
                    borderRadius: Spacing.borderRadius.sm,
                  }}
                  source={newsItem.image}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      padding: Spacing.padding.sm,
                      marginRight: Spacing.margin.base,
                    }}
                  >
                    <Ionicons
                      name="bookmark-outline"
                      size={FontSize.lg}
                      color={colors.textGray}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      padding: Spacing.padding.sm,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="dots-horizontal"
                      size={FontSize.lg}
                      color={colors.textGray}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default NewsScreen;
