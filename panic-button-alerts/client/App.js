import React, {useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Linking } from 'react-native';
import HomeScreen from "./pages/Homepage";
import RegisterScreen from "./pages/RegistrScreen";
import LoginScreen from "./pages/LogIn";
import SendEmailScreen from "./components/forgetPassword/SendEmail";
import ResetPasswordScreen from "./components/forgetPassword/ResetPassword";
const Stack = createStackNavigator();

 //const Stack = createNativeStackNavigator();
const App = () => {
  const linking = {
    prefixes: ['localhost:19006://'],
    config: {
      screens: {
         Login:'login',
       
        Register:'register' ,
        SendEmail:'sendEmail' ,
       PasswordReset:"passwordReset",
      Home: 'home'
      },
    },
  };
  //const Stack = createStackNavigator();
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
    <NavigationContainer linking={linking} initialState={initialState}>
      <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="SendEmail" component={SendEmailScreen} />
        <Stack.Screen name="PasswordReset" component={ResetPasswordScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;