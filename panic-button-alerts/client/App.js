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
const Drawer = createDrawerNavigator();
const icon = <FontAwesome icon="fa-light fa-circle-user" style={{color: "#83138b",}} />
//const Stack = createNativeStackNavigator();
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
    <NavigationContainer >
      <Drawer.Navigator
        drawerContent={(props) => {
          return (
            <SafeAreaView>
              <View
                style={{
                  height: 200,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottomColor: "#f4f4f4",
                  borderBottomWidth: 1,
                }}
              >
                <Image
                    source={require("./assets/user.png")}
                    style={{
                      height: 130,
                      width: 130,
                      borderRadius: 65
                    }}
                  />
                <Text
                  style={{
                    fontSize: 22,
                    marginVertical: 6,
                    fontWeight: "bold",
                    color: "#111",
                  }}
                >
                  Isabella Joanna
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#111",
                  }}
                >
                  Product Manager
                </Text>
              </View>
              <DrawerItemList {...props} />
            </SafeAreaView>
          );
        }}
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#fff",
            width: 250,
          },
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          drawerLabelStyle: {
            color: "#111",
          },
        }}
      >
        <Drawer.Screen
          name="Home"
          options={{
            drawerLabel: "Home",
            title: "Home",
            drawerIcon: () => (
              <SimpleLineIcons name="home" size={20} color="#808080" />
            ),
          }}
          component={HomeScreen}
        />

        <Drawer.Screen
          name="Login"
          options={{
            drawerLabel: "Login",
            title: "Login",
            drawerIcon: () => (
              <MaterialIcons name="category" size={20} color="#808080" />
            ),
          }}
          component={Login}
        />
        <Drawer.Screen
          name="SendEmail"
          options={{
            drawerLabel: "SendEmail",
            title: "SendEmail",
            drawerIcon: () => (
              <MaterialIcons
                name="dashboard-customize"
                size={20}
                color="#808080"
              />
            ),
          }}
          component={SendEmailScreen}
        />
        <Drawer.Screen
          name="Register"
          options={{
            drawerLabel: "Register",
            title: "Register",
            drawerIcon: () => (
              <SimpleLineIcons name="settings" size={20} color="#808080" />
            ),
          }}
          component={RegisterScreen}
        />

        <Drawer.Screen
          name="ResetPassword"
          options={{
            drawerLabel: "ResetPassword",
            title: "ResetPassword",
            drawerIcon: () => (
              <MaterialIcons name="backup" size={20} color="#808080" />
            ),
          }}
          component={ResetPasswordScreen}
        />
      </Drawer.Navigator>
    </NavigationContainer>

    // <NavigationContainer linking={linking} initialState={initialState}>
    //   <Stack.Navigator>
    //     <Stack.Screen name="Login" component={Login} />
    //     <Stack.Screen name="Register" component={RegisterScreen} />
    //     <Stack.Screen name="SendEmail" component={SendEmailScreen} />
    //     <Stack.Screen name="PasswordReset" component={ResetPasswordScreen} />
    //     <Stack.Screen name="Home" component={HomeScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default App;
