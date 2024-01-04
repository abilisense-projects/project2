// Import React
import React from "react";

// Import Navigators from React Navigation
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Import Screens
import HomeScreen from "../pages/HomePage";
import SettingsScreen from "../pages/HomePage";
import CustomSidebarMenu from "./CustomSidebarMenu";
import NavigationDrawerHeader from "./NavigationDrawerHeader";
import LogoutScreen from "../pages/LogoutScreen";

//Import Icon
import { FontAwesome5 } from "@expo/vector-icons"; // Import the appropriate icon component

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Home", //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: "#307ecc", //Set Header color
          },
          headerTintColor: "#fff", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const SettingScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: "#307ecc", //Set Header color
        },
        headerTintColor: "#fff", //Set Header text color
        headerTitleStyle: {
          fontWeight: "bold", //Set Header text style
        },
      }}
    >
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: "Settings", //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigatorRoutes = (props) => {
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
      screenOptions={{ headerShown: false }}
      drawerContent={CustomSidebarMenu}
    >
      <Drawer.Screen
        name="HomeScreenStack"
        options={{
          drawerLabel: "Home Screen",
          drawerIcon: ({ color }) => (
            <FontAwesome5 name="home" size={20} color={color} />
          ),
        }}
        component={HomeScreenStack}
      />
      <Drawer.Screen
        name="SettingScreenStack"
        options={{ drawerLabel: "Setting Screen" }}
        component={SettingScreenStack}
      />
      
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;
