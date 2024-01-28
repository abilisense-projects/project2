// Import React
import React from "react";

// Import Navigators from React Navigation
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Import Screens
import HomeScreen from "../../pages/Homepage";
import SettingScreen from "../../pages/SettingScreen";
import CustomSidebarMenu from "./CustomSidebarMenu";
import NavigationDrawerHeader from "./NavigationDrawerHeader";

// Import Icon
import { FontAwesome5, Ionicons, FontAwesome } from "@expo/vector-icons"; // Import the appropriate icon component
import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import Historypage from "../../pages/Historypage";
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
          title: false, // Set Header Title
          headerLeft: () =>
            isHebrew ? undefined : (
              <NavigationDrawerHeader navigationProps={navigation} />
            ),
          headerRight: isHebrew
            ? () => <NavigationDrawerHeader navigationProps={navigation} />
            : undefined,
          headerStyle: {
            backgroundColor: colors.background, // Set Header color
          },
          headerTintColor: colors.text, // Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", // Set Header text style
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

          headerLeft: () =>
            isHebrew ? undefined : (
              <NavigationDrawerHeader navigationProps={navigation} />
            ),
          headerRight: isHebrew
            ? () => <NavigationDrawerHeader navigationProps={navigation} />
            : undefined,
          headerStyle: {
            backgroundColor: colors.background, // Set Header color
          },
          headerTintColor: colors.text, // Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", // Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};
const HistoryScreenStack = ({ navigation }) => {
  const { colors } = useTheme();
  const { t, i18n } = useTranslation();

  const isHebrew = i18n.language === "he";

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HistoryScreen"
        component={Historypage}
        options={{
          title: false, // Set Header Title
          headerLeft: () =>
            isHebrew ? undefined : (
              <NavigationDrawerHeader navigationProps={navigation} />
            ),
          headerRight: isHebrew
            ? () => <NavigationDrawerHeader navigationProps={navigation} />
            : undefined,
          headerStyle: {
            backgroundColor: colors.background, // Set Header color
          },
          headerTintColor: colors.text, // Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", // Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigatorRoutes = (props) => {
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
        color: "#f8ecf8",
        itemStyle: {
          marginVertical: 5,
          color: "white",
        },
        labelStyle: {
          color: "#d8d8d8",
        },
         drawerPosition: isHebrew ? "right" : "left",
         
      }}
      drawerContent={CustomSidebarMenu}
    >
      <Drawer.Screen
        name="HomeScreenStack"
        options={{
          drawerLabel: t("Home Screen"),
          drawerIcon: ({ color }) => (
            <FontAwesome5 name="home" size={19} color={colors.text} />
          ),
        }}
        component={HomeScreenStack}
      />
      <Drawer.Screen
        name="SettingScreenStack"
        options={{
          drawerLabel: t("Setting Screen"),
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-sharp" size={20} color={colors.text} />
          ),
        }}
        component={SettingScreenStack}
      />
      <Drawer.Screen
        name="HistoryScreenStack"
        options={{
          drawerLabel: t("History Screen"),
          drawerIcon: ({ color }) => (
            <FontAwesome name="list-alt" size={20} color={colors.text} />
          ),
        }}
        component={HistoryScreenStack}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;
