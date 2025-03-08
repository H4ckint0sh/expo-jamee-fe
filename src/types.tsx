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

export interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  addLikedArticle: (article_id: number, like: number) => void;
}

export interface User {
  username: string;
  name: string;
  avatar_url: string;
  likes: { [key: number]: number };
}

export interface Article {
  article_id: number;
  article_img_url: string;
  author: string;
  author_avatar_url: string;
  body: string;
  comment_count: number;
  created_at: string;
  name?: string;
  title: string;
  topic: string;
  votes: number;
}

export interface Comment {
  article_id: number;
  author: string;
  author_avatar_url: string;
  body: string;
  comment_id: number;
  created_at: string;
  votes: number;
}
