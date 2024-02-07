// Import React
import React from "react";

// Import Navigators from React Navigation
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Import Screens
import HomeScreen from "../../pages/HomeScreen";
import SettingScreen from "../../pages/SettingScreen";
import CustomSidebarMenu from "./CustomSidebarMenu";
import NavigationDrawerHeader from "./NavigationDrawerHeader";

// Import Icon
import { FontAwesome5, Ionicons, FontAwesome } from "@expo/vector-icons"; // Import the appropriate icon component
import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import Historypage from "../../pages/HistoryScreen";
import { I18nManager } from "react-native";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const HomeScreenStack = ({ navigation }) => {
  const { colors } = useTheme();
  const { t, i18n } = useTranslation();

  const isHebrew = i18n.language === "he";

  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: false,
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text, 
          headerTitleStyle: {
            fontWeight: "bold", 
          },
        }}
      />
    </Stack.Navigator>
  );
};

const SettingScreenStack = ({ navigation }) => {
  const { colors } = useTheme();
  const { t, i18n } = useTranslation();

  const isHebrew = i18n.language === "he";
  if (isHebrew) {
    I18nManager.forceRTL(true);
  } else {
    I18nManager.forceRTL(false);
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          title: false,
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),       
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text, 
          headerTitleStyle: {
            fontWeight: "bold", 
          },
        }}
      />
    </Stack.Navigator>
  );
};
const HistoryScreenStack = ({ navigation }) => {
  const { colors } = useTheme();
  const { t, i18n } = useTranslation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HistoryScreen"
        component={Historypage}
        options={{
          title: false, 
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text, 
          headerTitleStyle: {
            fontWeight: "bold", 
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default function DrawerNavigatorRoutes(props) {
  const { colors } = useTheme();
  const { t, i18n } = useTranslation();

  const isHebrew = i18n.language === "he";
  if (isHebrew) {
    I18nManager.forceRTL(true);
  } else {
    I18nManager.forceRTL(false);
  }

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        activeTintColor: "#f8ecf8",
        color: colors.background,
        itemStyle: {          
          color: colors.background,
        },
        labelStyle: {          
          color: colors.border,
        },
      }}
      drawerContent={CustomSidebarMenu}
    >
      <Drawer.Screen
        name="HomeScreenStack"
        options={{
          drawerLabel: t("Home Screen"),
          drawerIcon: () => (
            <FontAwesome5 name="home" size={20} color={colors.text} />
          ),
        }}
        component={HomeScreenStack}
      />
      <Drawer.Screen
        name="SettingScreenStack"
        options={{
          drawerLabel: t("Setting Screen"),
          drawerIcon: () => (
            <Ionicons name="settings-sharp" size={20} color={colors.text} />
          ),
        }}
        component={SettingScreenStack}
      />
      <Drawer.Screen
        name="HistoryScreenStack"
        options={{
          drawerLabel: t("History Screen"),
          drawerIcon: () => (
            <FontAwesome name="list-alt" size={20} color={colors.text} />
          ),
        }}
        component={HistoryScreenStack}
      />
    </Drawer.Navigator>
  );
}
