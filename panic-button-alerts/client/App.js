import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SendEmailScreen from "./components/forgetPassword/SendEmail";
import ResetPasswordScreen from "./components/forgetPassword/ResetPassword";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./pages/Homepage";
import RegisterScreen from "./pages/RegistrScreen";
import LoginScreen from "./pages/LogIn";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">

      {/* navigation.navigate({ routeName: SCREEN, key: SCREEN_KEY_A }); */}
      {/* initialRouteName="password-reset" */}
        <Stack.Screen name="sendEmail" component={SendEmailScreen}  
        />
        <Stack.Screen name="password-reset" component={ResetPasswordScreen} 
     />
        <Stack.Screen name="home" component={HomeScreen}  options={{title: 'Welcome'}} 
       />
        <Stack.Screen name="register" component={RegisterScreen}   />
        <Stack.Screen name="login" component={LoginScreen} />
        {/* <Drawer.Screen
  name="Home"
  component={HomeScreen}
  options={{
    title: "Home Page", //set the title of the page to 'Home page'
  }}
/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
