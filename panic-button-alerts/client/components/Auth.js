import { createStackNavigator } from "@react-navigation/stack";
import LogIn from "../pages/LogIn";
import RegisterScreen from "../pages/RegistrScreen";
import SendEmail from "./forgetPassword/SendEmailScreen";
import "react-native-gesture-handler";
import ResetPassword from "./forgetPassword/ResetPasswordScreen";
import { Linking } from "react-native";
import { useEffect } from "react";
import LanguageSelector from "../pages/Language";
const Stack = createStackNavigator();
export const Auth = ({ navigation }) => {
  // Stack Navigator for Login and Sign up Screen
  useEffect(() => {
    // Add event listener to handle deep linking
    const handleDeepLink = async ({ url }) => {
      const route = url.replace(/.*?:\/\//g, "");
      console.log(route);
      if (route.includes("ResetPassword")) {
        if (route.includes("token")) {
          // Navigate to the PasswordResetScreen
          navigation.navigate("ResetPassword");
        } else {
          // Handle missing token in the URL (e.g., show an error message)
          console.error("Token missing in the URL");
        }
      }
      if (route.includes("Register")) {
        navigation.navigate("Register");
      }
    };
    // Subscribe to deep linking events
    Linking.addEventListener("url", handleDeepLink);
    // Check if the app was opened via deep linking
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });
    
  }, []);
  
  return (
    <Stack.Navigator initialRouteName="LogIn">
      <Stack.Screen
        name="LogIn"
        component={LogIn }
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
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
        component={SendEmail}
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
  );
};
