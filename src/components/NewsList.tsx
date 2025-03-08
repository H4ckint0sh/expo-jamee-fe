import { View, StyleSheet, Image, Text } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { News } from "@/data";
import { Article } from "@/types";

interface NewsListProps {
  newsList: Article[];
}

const NewsList = ({ newsList }: NewsListProps) => {
  return (
    <View style={styles.container}>
      {newsList &&
        newsList.length > 0 &&
        newsList.map((item: Article, index: number) => (
          <View key={index} style={styles.itemContainer}>
            <Image
              source={{ uri: item.article_img_url }}
              style={styles.itemImg}
            />
            <View style={styles.itemInfo}>
              <Text style={styles.itemCategory}>{item.topic}</Text>
              <Text style={styles.itemTitle}>{item.title}</Text>
            </View>
          </View>
        ))}
    </View>
  );
};

export default NewsList;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    flex: 1,
    gap: 10,
  },
  itemImg: {
    width: 90,
    height: 100,
    borderRadius: 20,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
    gap: 10,
    justifyContent: "space-between",
  },
  itemCategory: {
    fontSize: 12,
    color: Colors.darkGrey,
    textTransform: "capitalize",
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.black,
  },
});
