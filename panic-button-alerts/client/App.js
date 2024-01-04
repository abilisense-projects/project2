import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
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
const Drawer = createDrawerNavigator();
const icon = (
  <FontAwesome icon="fa-light fa-circle-user" style={{ color: "#83138b" }} />
);

//const Stack = createNativeStackNavigator();
const Stack = createStackNavigator();
const Auth = () => {

  return (
    // <NavigationContainer linking={linking}>
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={Login}
        options={{ headerShown: false }}
      />

       <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: "Register", //Set Header Title
          headerStyle: {
            backgroundColor: "#AD40AF", //Set Header color
          },
          headerTintColor: "#fff", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
        }}
      />
      <Stack.Screen
        name="SendEmail"
        component={SendEmailScreen}
        options={{
          title: "SendEmail", //Set Header Title
          headerStyle: {
            backgroundColor: "#AD40AF", //Set Header color
          },
          headerTintColor: "#fff", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );
};

const App = () => {

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
const linking = {
  prefixes: [ 'http://localhost:19006'],
  config: {
    screens: {
      Auth:
        "auth",
        DrawerNavigationRoutes:"drawerNavigationRoutes"
      }
       
    }

  }


  return (
    //  <Map/>

    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="SplashScreen"
          component={Splash}
          // Hiding header for Splash Screen
          options={{ headerShown: false }}
        />
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
