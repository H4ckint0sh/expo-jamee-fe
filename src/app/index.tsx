import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";

export default function Index() {
    const router = useRouter();

    return (
        <View style={styles.mainContainer}>
            <StatusBar style="light" />
            <ImageBackground
                source={require("../assets/images/getting-started.jpg")}
                resizeMode="cover"
                style={styles.imageBackground}
            >
                <View style={styles.textContainer}>
                    <Animated.Text
                        entering={FadeInRight.delay(300).duration(500)}
                        style={styles.title}
                    >
                        Stay updated
                    </Animated.Text>
                    <Text style={styles.description}>with the latest news</Text>
                    <Animated.View entering={FadeInDown.delay(1000).duration(500)}>
                        <TouchableOpacity onPress={() => router.replace("/(tabs)")}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Getting Started</Text>
                            </View>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    imageBackground: {
        width: "100%",
        height: "100%",
        flex: 1,
    },
    textContainer: {
        flex: 1,
        gap: 10,
        paddingBottom: 40,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.5)",
        paddingHorizontal: 20,
    },
    title: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
    description: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
    },
    button: {
        width: "100%", // Set width to 100%
        maxWidth: 700, // Max width of 700 pixels
        backgroundColor: "blue",
        padding: 20,
        borderRadius: 5,
        alignSelf: "center",
    },
    buttonText: {
        color: "white",
        alignSelf: "center",
    },
});
