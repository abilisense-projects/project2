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

      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen name="SendEmail" component={SendEmailScreen} />
        <Stack.Screen name="Password-reset" component={ResetPasswordScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
