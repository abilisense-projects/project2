import { createStackNavigator } from "@react-navigation/stack";
import { Linking } from "react-native";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import "react-native-gesture-handler";
import ResetPassword from "../forgetPassword/ResetPasswordScreen";
import Login from "../../pages/LoginScreen";
import RegisterScreen from "../../pages/RegistrScreen";
import SendEmail from "../../pages/SendEmailScreen";
import CustomHeader from "./CustomHeader";
import Toast from "react-native-toast-message";

const Stack = createStackNavigator();
export const Auth = ({ navigation }) => {
  const { t, i18n } = useTranslation();

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
    <>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
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
            title: t("Register"), //Set Header Title
            headerStyle: {
              backgroundColor: "#E33458", //Set Header color
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
            title: t("SendEmail"), //Set Header Title
            headerStyle: {
              backgroundColor: "#E33458", //Set Header color
            },
            headerTintColor: "#fff", //Set Header text color
            headerTitleStyle: {
              fontWeight: "bold", //Set Header text style
            },
          }}
        />
      </Stack.Navigator>
      <Toast />
    </>
  );
};
