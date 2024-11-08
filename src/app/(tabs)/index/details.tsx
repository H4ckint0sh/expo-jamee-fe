import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import Markdown from "react-native-markdown-package";
import Spacing from "../../../constants/Spacing";
import NewsHeader from "../../../components/NewsHeader";
import Dot from "../../../components/Dot";
import Font from "../../../constants/Font";
import FontSize from "../../../constants/FontSize";
import useColors from "../../../hooks/useColors";
import { RootStackType } from "../../../types";
import { useLocalSearchParams } from "expo-router";

type Props = NativeStackScreenProps<RootStackType, "Details">;

const DetailScreen: React.FC<any> = () => {
    const colors = useColors()

    const params = useLocalSearchParams();
    const { news } = params;
    const newsItem = JSON.parse(news as string);

    return (
        <SafeAreaView>
            <NewsHeader categoryId={newsItem.categoryId} />
            <ScrollView
                style={{
                    padding: Spacing.padding.base,
                }}
            >
                <View
                    style={{
                        paddingVertical: Spacing.padding.base,
                    }}
                >
                    <Text
                        style={{
                            fontSize: FontSize.xl,
                            fontFamily: Font["poppins-semiBold"],
                        }}
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
                            {newsItem.author}
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
                    <Image
                        source={newsItem.image}
                        style={{
                            width: "100%",
                            height: 250,
                            borderRadius: Spacing.borderRadius.lg,
                        }}
                    />
                    <Markdown
                        styles={{
                            text: {
                                color: colors.text,
                            },
                            view: {
                                marginVertical: Spacing.margin.base,
                            },
                            heading2: {
                                fontFamily: Font["poppins-semiBold"],
                            },
                        }}
                    >
                        {newsItem.body}
                    </Markdown>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default DetailScreen;
