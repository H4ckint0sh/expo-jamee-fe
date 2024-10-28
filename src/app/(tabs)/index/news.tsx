import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link, useRouter } from 'expo-router'

type Props = {}

const Page = (props: Props) => {
    const router = useRouter()
    return (
        <View style={styles.container}>
            <Text>News Screen</Text>
            <TouchableOpacity onPress={() => router.push("/details")}>
                <View >
                    <Text >to details</Text>
                </View>
            </TouchableOpacity>

        </View>
    )
}

export default Page

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})
