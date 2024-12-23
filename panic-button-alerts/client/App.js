import React, { useState, useEffect, useMemo } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { PanResponder } from "react-native";
import "react-native-gesture-handler";
import Splash from "./pages/Splash";
import DrawerNavigatorRoutes from "./components/Navigation/DrawerNavigatorRoutes";
import { Auth } from "./components/Navigation/Auth";
import { get, remove, save } from "./services/Storage";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppContext } from "./components/context/AppContext";
import DarkTheme from "./components/theme/DarkTheme";
import DefaultTheme from "./components/theme/DefaultTheme";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";

const isAndroid = Platform.OS === "android";
const isHermes = !!global.HermesInternal;

if (isAndroid || isHermes) {
  require("@formatjs/intl-locale/polyfill");

  require("@formatjs/intl-pluralrules/polyfill");
  require("@formatjs/intl-pluralrules/locale-data/en");
  require("@formatjs/intl-pluralrules/locale-data/he");

  require("@formatjs/intl-displaynames/polyfill");
  require("@formatjs/intl-displaynames/locale-data/en");
  require("@formatjs/intl-displaynames/locale-data/he");
}

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Could be anything that returns default preferred language
import { getLocales } from "expo-localization";

// Import all the languages you want here
import en from "./locales/en/translation.json";
import he from "./locales/he/translation.json";

i18n.use(initReactI18next).init({
  // Add any imported languages here
  resources: {
    en: {
      translation: en,
    },
    he: {
      translation: he,
    },
  },
  lng: getLocales()[0].languageCode,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // https://www.i18next.com/translation-function/interpolation#unescape
  },
  returnNull: false,
});

const Stack = createStackNavigator();

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const appContext = useMemo(() => {
    return {
      isDarkTheme,
      setIsDarkTheme,
    };
  });
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const isAuthenticated = async () => {
    try {
      const accessToken = await get('accessToken');
      return !!accessToken; // Convert accessToken to a boolean
    } catch (error) {
      console.error('Error checking authentication status:', error);
      return false; // In case of an error, assume not authenticated
    }
  };
  useEffect(() => {
    const interval = setInterval(async() => {
      const isLoggedIn = await isAuthenticated();
      if (isLoggedIn &&Date.now() - lastInteraction >= 1000 * 60 * 30) {

        alert("User is inactive for 30 minutes. Logging out...");
        // Reset the last interaction time to prevent multiple logouts
        setLastInteraction(Date.now());
        await remove("accessToken");
        window.location.href = "/Login";
      }
    }, 1000 * 60); // Check every minute

    return () => clearInterval(interval);
  }, [lastInteraction]);

  // Setup PanResponder to listen to all touch events
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderStart: () => {
      setLastInteraction(Date.now());
    },
  });

  return (
    <SafeAreaProvider style={{ flex: 1 }} {...panResponder.panHandlers}>
      <StatusBar style={isDarkTheme ? "light" : "dark"} />
      <NavigationContainer theme={isDarkTheme ? DarkTheme : DefaultTheme}>
        <AppContext.Provider value={appContext}>
          <Stack.Navigator>
            {/* SplashScreen which will come once for 5 Seconds */}
            <Stack.Screen
              name="SplashScreen"
              component={Splash}
              // Hiding header for Splash Screen
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Auth"
              component={Auth}
              options={{ headerShown: false }}
            />

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
