import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {  NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, Linking, SafeAreaView, Text, View, useColorScheme } from "react-native";

import Map from "./components/MapComponent";
import "react-native-gesture-handler";
import Splash from "./components/Splash";
import DrawerNavigatorRoutes from "./components/DrawerNavigatorRoutes";
import { Auth } from "./components/Auth";
import { get, save } from "./components/Storage";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppContext } from "./components/context/AppContext";
import DarkTheme from "./components/theme/DarkTheme";
import DefaultTheme from "./components/theme/DefaultTheme";
import { StatusBar } from "expo-status-bar";

const Stack = createStackNavigator();

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // State to track loading state
  const [token, setToken] = useState(null); // State to store the token

  const appContext = useMemo(() => {
    return {
      isDarkTheme,
      setIsDarkTheme,
      setToken, // You may want to pass this to the context as well if needed
    };
  });

  useEffect(() => {
    // Perform async check for the token
    const checkToken = async () => {
      try {
        const storedToken = await get("accessToken"); // Replace with your actual token key
        setToken(storedToken);
      } catch (error) {
        console.error("Error checking token:", error);
      } finally {
        setIsLoading(false); // Mark loading as complete
      }
    };

    checkToken();
  }, []); // Empty dependency array to run the effect only once on component mount

  if (isLoading) {
    // Render a loading indicator, splash screen, or any placeholder while checking the token
    return <Splash />;
  }

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <StatusBar style={isDarkTheme ? 'light' : 'dark'} />
      <NavigationContainer theme={isDarkTheme ? DarkTheme : DefaultTheme}>
        <AppContext.Provider value={appContext}>
          <Stack.Navigator>
            {token ? ( // If token exists, navigate to DrawerNavigationRoutes
              <Stack.Screen
                name="DrawerNavigationRoutes"
                component={DrawerNavigatorRoutes}
                options={{ headerShown: false }}
              />
            ) : (
              // If no token, navigate to Auth screen
              <Stack.Screen
                name="Auth"
                component={Auth}
                options={{ headerShown: false }}
              />
            )}
          </Stack.Navigator>
        </AppContext.Provider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
