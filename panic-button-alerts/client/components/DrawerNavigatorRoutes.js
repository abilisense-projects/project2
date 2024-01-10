// Import React
import React from "react";

// Import Navigators from React Navigation
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Import Screens
import HomeScreen from "../pages/HomePage";
import SettingScreen from "../pages/SettingScreen";
import CustomSidebarMenu from "./CustomSidebarMenu";
import NavigationDrawerHeader from "./NavigationDrawerHeader";


//Import Icon
import { FontAwesome5,Ionicons } from "@expo/vector-icons"; // Import the appropriate icon component
import { useTheme } from "@react-navigation/native";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const HomeScreenStack = ({ navigation }) => {
  const { colors } = useTheme();


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
            backgroundColor: colors.background, //Set Header color
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
        component={SettingScreen}
        options={{
          title: "Settings", //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigatorRoutes = (props) => {
  const { colors } = useTheme();

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
          drawerLabel:"Home Screen",
          drawerIcon: ({ color }) => (
            <FontAwesome5 name="home" size={20} color={colors.text} />
          ),
        }}
        component={HomeScreenStack}
      />
      <Drawer.Screen
        name="SettingScreenStack"
        options={{ drawerLabel:"Setting Screen",drawerIcon: ({ color }) => (
          <Ionicons name='settings-sharp' size={20} color={colors.text} />

        ), }}
        component={SettingScreenStack}
      />
      
    </Drawer.Navigator>
   
  );
};

export default DrawerNavigatorRoutes;
