import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import EmailVartificationScreen from "./components/forgetPassword/EmailVartification";
import ResetPasswordScreen from "./components/forgetPassword/ResetPassword";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./components/forgetPassword/Home";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="EmailVartification">
      <Stack.Screen name="EmailVartification" component={EmailVartificationScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
