/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { News } from "./data";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export interface SettingsRouteParams {}

export interface PrayersRouteParams {}

export type RouteStackParams = {
  Prayers: PrayersRouteParams;
  Profile: SettingsRouteParams;
};

export type RouteParams<T extends keyof RouteStackParams> =
  NativeStackScreenProps<RouteStackParams, T>;

export type RootStackType = {
  HomeTabs: undefined;
  Details: { news: string };
};

export type TabNavigatorType = {
  HomeNavigator: undefined;
  NewsNavigator: undefined;
  SettingsScreen: undefined;
};

export type HomeNavigatorType = {
  Home: undefined;
};

export type NewsNavigatorType = {
  News: undefined;
};
