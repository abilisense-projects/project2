import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, Linking, SafeAreaView, Text, View } from "react-native";
import HomeScreen from "./pages/Homepage";
import RegisterScreen from "./pages/RegistrScreen";
import SendEmailScreen from "./components/forgetPassword/SendEmail";
import ResetPasswordScreen from "./components/forgetPassword/ResetPassword";
import Login from "./pages/LogIn";
import Map from "./components/MapComponent";
import "react-native-gesture-handler";
import {
  SimpleLineIcons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import "react-native-gesture-handler";
import {
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import Splash from "./components/Splash";
import DrawerNavigatorRoutes from "./components/DrawerNavigatorRoutes";
const Drawer = createDrawerNavigator();
const icon = (
  <FontAwesome icon="fa-light fa-circle-user" style={{ color: "#83138b" }} />
);
//const Stack = createNativeStackNavigator();
const Stack = createStackNavigator();
const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
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
            backgroundColor: '#AD40AF', //Set Header color
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
            backgroundColor: '#AD40AF', //Set Header color
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

const App = () => {
  const linking = {
    prefixes: ["localhost:19006://"],
    config: {
      screens: {
        Home: "home",
        Details: "details/:id",
        Register: "register",
        SendEmail: "sendEmail",
        PasswordReset: "passwordreset",
        Login: "login",
      },
    },
  };
  const [initialState, setInitialState] = useState();

  useEffect(() => {
    const fetchInitialUrl = async () => {
      const url = await Linking.getInitialURL();
    };

    fetchInitialUrl();
  }, []);

  return (
    // <Map/>
    // <NavigationContainer linking={linking} >
    //   <Drawer.Navigator
    //     drawerContent={(props) => {
    //       return (
    //         <SafeAreaView>
    //           <View
    //             style={{
    //               height: 200,
    //               width: "100%",
    //               justifyContent: "center",
    //               alignItems: "center",
    //               borderBottomColor: "#f4f4f4",
    //               borderBottomWidth: 1,
    //             }}
    //           >
    //             <Image
    //                 source={require("./assets/user.png")}
    //                 style={{
    //                   height: 130,
    //                   width: 130,
    //                   borderRadius: 65
    //                 }}
    //               />
    //             <Text
    //               style={{
    //                 fontSize: 22,
    //                 marginVertical: 6,
    //                 fontWeight: "bold",
    //                 color: "#111",
    //               }}
    //             >
    //               Isabella Joanna
    //             </Text>
    //             <Text
    //               style={{
    //                 fontSize: 16,
    //                 color: "#111",
    //               }}
    //             >
    //               Product Manager
    //             </Text>
    //           </View>
    //           <DrawerItemList {...props} />
    //         </SafeAreaView>
    //       );
    //     }}
    //     screenOptions={{
    //       drawerStyle: {
    //         backgroundColor: "#fff",
    //         width: 250,
    //       },
    //       headerStyle: {
    //         backgroundColor: "#f4511e",
    //       },
    //       headerTintColor: "#fff",
    //       headerTitleStyle: {
    //         fontWeight: "bold",
    //       },
    //       drawerLabelStyle: {
    //         color: "#111",
    //       },
    //     }}
    //   >
    //     <Drawer.Screen
    //       name="Home"
    //       options={{
    //         drawerLabel: "Home",
    //         title: "Home",
    //         drawerIcon: () => (
    //           <SimpleLineIcons name="home" size={20} color="#808080" />
    //         ),
    //       }}
    //       component={HomeScreen}
    //     />

    //     <Drawer.Screen
    //       name="Login"
    //       options={{
    //         drawerLabel: "Login",
    //         title: "Login",
    //         drawerIcon: () => (
    //           <MaterialIcons name="category" size={20} color="#808080" />
    //         ),
    //       }}
    //       component={Login}
    //     />
    //     <Drawer.Screen
    //       name="SendEmail"
    //       options={{
    //         drawerLabel: "SendEmail",
    //         title: "SendEmail",
    //         drawerIcon: () => (
    //           <MaterialIcons
    //             name="dashboard-customize"
    //             size={20}
    //             color="#808080"
    //           />
    //         ),
    //       }}
    //       component={SendEmailScreen}
    //     />
    //     <Drawer.Screen
    //       name="Register"
    //       options={{
    //         drawerLabel: "Register",
    //         title: "Register",
    //         drawerIcon: () => (
    //           <SimpleLineIcons name="settings" size={20} color="#808080" />
    //         ),
    //       }}
    //       component={RegisterScreen}
    //     />

    //     <Drawer.Screen
    //       name="ResetPassword"
    //       options={{
    //         drawerLabel: "ResetPassword",
    //         title: "ResetPassword",
    //         drawerIcon: () => (
    //           <MaterialIcons name="backup" size={20} color="#808080" />
    //         ),
    //       }}
    //       component={ResetPasswordScreen}
    //     />
    //   </Drawer.Navigator>
    // </NavigationContainer>
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
      </Stack.Navigator>
    </NavigationContainer>

    
  );
};

export default App;
