// src/navigation/rootTypes.ts
import { NavigatorScreenParams } from '@react-navigation/native';
import { AuthStackParamList } from './auth/authTypes';
import { MainTabsParamList } from './main/mainTypes'; // <-- Updated import

export type RootStackParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  MainTabs: NavigatorScreenParams<MainTabsParamList>;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}