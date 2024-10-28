import React from "react";
import { Tabs } from "expo-router";
import { TabBar } from "@/components/TabBar";

const TabLayout = () => {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Nyheter",
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "kalender",
        }}
      />
      <Tabs.Screen
        name="prayerTimes"
        options={{
          title: "Bönetider",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
