import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import TabBar from '../components/TabBar'

const _layout = () => {
    return (
        <Tabs
            tabBar={props => <TabBar {...props} />}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "News"
                }}
            />
            <Tabs.Screen
                name="calendar"
                options={{
                    title: "Calendar"
                }}
            />
            <Tabs.Screen
                name="prayTimes"
                options={{
                    title: "Pray Times"
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile"
                }}
            />
        </Tabs>
    )
}

export default _layout
