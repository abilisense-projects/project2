import React, { useState, useEffect, useRef } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, Linking, SafeAreaView, Text, View } from "react-native";
import RegisterScreen from "./pages/RegistrScreen";
import SendEmailScreen from "./components/forgetPassword/SendEmailScreen";
import ResetPasswordScreen from "./components/forgetPassword/ResetPasswordScreen";
import Login from "./pages/LogInPage";
import Map from "./components/MapComponent";
import "react-native-gesture-handler";
import Splash from "./components/Splash";
import DrawerNavigatorRoutes from "./components/DrawerNavigatorRoutes";
import { Auth } from "./components/Auth";
import Homepage from "../pages/HomePage";

const Stack = createStackNavigator();


const App = () => {
  
  const linking = {
    prefixes: ['localhost:19006://'],
    config: {
      screens: {
        Login: 'login',
        Details: 'details/:id',
        Register: 'register',
        SendEmail: 'sendEmail',
        PasswordReset: 'passwordReset',
        Home: 'home'
      },
    },
  };
  const [initialState, setInitialState] = useState();

  useEffect(() => {
    const fetchInitialUrl = async () => {
      const url = await Linking.getInitialURL();

      if (url !== null) {
        setInitialState(NavigationContainer.resolveRootScreen(linking, url));
      }
    };

    fetchInitialUrl();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" linking={linking}>
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
        <Stack.Screen
          name="ResetPassword"
          component={ResetPasswordScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>


  );
};

export default App;
