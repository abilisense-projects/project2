import { createStackNavigator } from "@react-navigation/stack";
import Login from "../pages/LogInPage";
import RegisterScreen from "../pages/RegistrScreen";
import SendEmail from "./forgetPassword/SendEmailScreen";
import "react-native-gesture-handler";
import ResetPassword from "./forgetPassword/ResetPasswordScreen";
import { Linking } from "react-native";
import { useEffect } from "react";
const Stack = createStackNavigator();

export const Auth = ({navigation}) => {

  // Stack Navigator for Login and Sign up Screen
 
  useEffect(() => {
    // Add event listener to handle deep linking
    const handleDeepLink = ({ url }) => {
      const route = url.replace(/.*?:\/\//g, "");
      const id = route.match(/\/([^\/]+)\/?$/)[1];
      console.log(id);
      if (id === "ResetPassword") {
        console.log("came");
        // Navigate to the PasswordResetScreen

        navigation.navigate('ResetPassword');
      }
      if(id=== "Register"){
        navigation.navigate('Register');
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

    // Clean up the event listener
    return () => Linking.removeEventListener("url", handleDeepLink);
  }, []);
  

  
  return (
    <Stack.Navigator initialRouteName="login" >
      <Stack.Screen
        name="Login"
        component={Login}
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
