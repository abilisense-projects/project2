// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";
// import SendEmailScreen from "./components/forgetPassword/SendEmail";
// import ResetPasswordScreen from "./components/forgetPassword/ResetPassword";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import HomeScreen from "./pages/Homepage";
// import RegisterScreen from "./pages/RegistrScreen";
// import LoginScreen from "./pages/LogIn";
// // import { render } from "react-dom";
// // import Routes from './pages/Route'

// const Stack = createNativeStackNavigator();
// export default function App() {
//   // render();{
//     return (

//       // <Routes />
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="home">
//           <Stack.Screen name="sendEmail" component={SendEmailScreen} />
//           <Stack.Screen name="password-reset" component={ResetPasswordScreen} />
//           <Stack.Screen name="home" component={HomeScreen} />
//           <Stack.Screen name="register" component={RegisterScreen} />
//           <Stack.Screen name="login" component={LoginScreen} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     );
//   }
// // }




import React, {useState, useEffect,useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import { navigationRef } from './RootNavigation';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Linking } from 'react-native';
import HomeScreen from "./pages/Homepage";
import RegisterScreen from "./pages/RegistrScreen";
import LoginScreen from "./pages/LogIn";
import SendEmailScreen from "./components/forgetPassword/SendEmail";
import ResetPasswordScreen from "./components/forgetPassword/ResetPassword";
const Stack = createStackNavigator();

 //const Stack = createNativeStackNavigator();
const App = ({}) => {
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
  const navigationRef = useRef(null)
  //const Stack = createStackNavigator();
  const [initialState, setInitialState] = useState();

  useEffect(() => {
    const fetchInitialUrl = async () => {
      const url = await Linking.getInitialURL();

      // if (url !== null) {
      //   setInitialState(NavigationContainer.resolveRootScreen(linking, url));
      // }
    };

    fetchInitialUrl();
  }, []);

  return (
    <NavigationContainer ref={navigationRef} linking={linking} initialState={initialState}>
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