import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Linking } from 'react-native';
import HomeScreen from "./pages/Homepage";
import RegisterScreen from "./pages/RegistrScreen";
import SendEmailScreen from "./components/forgetPassword/SendEmail";
import ResetPasswordScreen from "./components/forgetPassword/ResetPassword";
import Login from './pages/LogIn';
import YourComponent from'./pages/try';
import { Provider } from 'react-redux';
import { store } from './redux/store';
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
    // <Provider store={store}>
    <NavigationContainer linking={linking} initialState={initialState}>
      <Stack.Navigator>
     
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="SendEmail" component={SendEmailScreen} />
        <Stack.Screen name="PasswordReset" component={ResetPasswordScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    // </Provider >
  );
};

export default App;