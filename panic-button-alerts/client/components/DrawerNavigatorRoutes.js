// Import React
import React from "react";

// Import Navigators from React Navigation
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Import Screens
import HomeScreen from "../pages/Homepage";
import SettingScreen from "../pages/SettingScreen";
import CustomSidebarMenu from "./CustomSidebarMenu";
import NavigationDrawerHeader from "./NavigationDrawerHeader";

// Import Icon
import { FontAwesome5, Ionicons } from "@expo/vector-icons"; // Import the appropriate icon component
import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

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
          title:false, // Set Header Title
          headerLeft: () => (isHebrew ? undefined : <NavigationDrawerHeader navigationProps={navigation} />),
          headerRight: isHebrew ? (
           ()=> <NavigationDrawerHeader navigationProps={navigation} />
          ) : undefined,
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

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          title: false,

          headerLeft: () => (isHebrew ? undefined : <NavigationDrawerHeader navigationProps={navigation} />),
          headerRight: isHebrew ? (
            ()=><NavigationDrawerHeader navigationProps={navigation} />
          ) : undefined,
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

  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: "#f8ecf8",
        color: "#f8ecf8",
        itemStyle: { marginVertical: 5, color: "white" },
        labelStyle: {
          color: "#d8d8d8",
        },
      }}
      screenOptions={{
        headerShown: false,
        drawerPosition: isHebrew ? 'right' : 'left', // Set drawer position to right if language is Hebrew
      }}
      drawerContent={CustomSidebarMenu}
    >
      <Drawer.Screen
        name="HomeScreenStack"
        options={{
          drawerLabel: t("Home Screen"),
          drawerIcon: ({ color }) => (
            <FontAwesome5 name="home" size={20} color={colors.text} />
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
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;
