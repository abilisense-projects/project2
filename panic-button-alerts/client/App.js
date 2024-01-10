import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {  NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, Linking, SafeAreaView, Text, View, useColorScheme } from "react-native";

import Map from "./components/MapComponent";
import "react-native-gesture-handler";
import Splash from "./components/Splash";
import DrawerNavigatorRoutes from "./components/DrawerNavigatorRoutes";
import { Auth } from "./components/Auth";
import Homepage from "./pages/HomePage";
import { get, save } from "./components/Storage";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppContext } from "./components/context/AppContext";
import DarkTheme from "./components/theme/DarkTheme";
import DefaultTheme from "./components/theme/DefaultTheme";
import { StatusBar } from "expo-status-bar";


const Stack = createStackNavigator();


const App=()=> {

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const appContext = useMemo(() => {
    return {
      isDarkTheme,
      setIsDarkTheme
    }
  });


  return (
    <SafeAreaProvider style={{ flex: 1 }}>
    <StatusBar style={isDarkTheme ? 'light' : 'dark'} />
    <NavigationContainer theme={isDarkTheme ? DarkTheme : DefaultTheme}>
      <AppContext.Provider value={appContext}>
      <Stack.Navigator >
        {/* SplashScreen which will come once for 5 Seconds */}
        {/* <Stack.Screen
          name="SplashScreen"
          component={Splash}
          // Hiding header for Splash Screen
          options={{ headerShown: false }}
        /> */}
        {/* Auth Navigator: Include Login and Signup */}
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false }}
        />
        {/* Navigation Drawer as a landing page */}
        <Stack.Screen
          name="DrawerNavigationRoutes"
          component={DrawerNavigatorRoutes}
          // Hiding header for Navigation Drawer
          options={{ headerShown: false }}
        />
       
      </Stack.Navigator>
      </AppContext.Provider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
