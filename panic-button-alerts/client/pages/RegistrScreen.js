import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import InputField from "../services/InputField";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomButton from "../services/CustomButton";
import ValidateEmail from "../services/ValidateEmail";

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registrationError, setRegistrationError] = useState(null);
  


  const handleRegister = async () => {
    try {
      // Validate input (you can add your own validation logic)
      if (!ValidateEmail(email)) {
        setMessage("Please enter a valid email address.");
        return;
      }

      // Create a user object with registration details
      const user = {
        fullName,
        email,
        password,
      };

      // Make a POST request to your server endpoint
      const response = await axios.post("/users", user);

      // Check if the registration was successful based on your server's response
      if (response.status === 201) {
        console.log("Registration successful:", response.data);
        // Optionally, navigate to a success screen or perform other actions
        navigation.navigate("login");
      } else {
        // Handle unexpected server response
        console.error("Unexpected server response:", response);
      }
    } catch (error) {
      // Handle errors (e.g., display an error message)
      console.error("Registration failed:", error.message);

      // Check the type of error and provide appropriate feedback to the user
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(
          "Server responded with:",
          error.response.status,
          error.response.data
        );
        // Update state with a more user-friendly error message
         setRegistrationError('Registration failed. Please check your details and try again.');
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        // Update state with a more user-friendly error message
         setRegistrationError('Network error. Please check your internet connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
        // Update state with a more user-friendly error message
         setRegistrationError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25 }}
      >
        <View style={{ alignItems: "center" }}>
          {/* <RegistrationSVG
            height={300}
            width={300}
            style={{transform: [{rotate: '-5deg'}]}}
          /> */}
        </View>

        <Text
          style={{
            fontFamily: "Roboto-Medium",
            fontSize: 28,
            fontWeight: "500",
            color: "#333",
            marginBottom: 30,
          }}
        >
          Register
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 30,
          }}
        >
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: "#ddd",
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <Ionicons
              name="logo-google"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: "#ddd",
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <Ionicons
              name="logo-facebook"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: "#ddd",
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <Ionicons
              name="logo-twitter"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          </TouchableOpacity>
        </View>

        <Text style={{ textAlign: "center", color: "#666", marginBottom: 30 }}>
          Or, register with email ...
        </Text>

        <InputField
          label={"Full Name"}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          onChangeText={setFullName}
        />
        <InputField
          label={"Email ID"}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <InputField
          label={"Password"}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          onChangeText={setPassword}
          inputType="password"
        />
        <InputField
          label={"Confirm Password"}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          onChangeText={setConfirmPassword}
          inputType="password"
        />

        <CustomButton label={"Register"} onPress={handleRegister} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("login")}>
            <Text style={{ color: "#AD40AF", fontWeight: "700" }}> Login</Text>
          </TouchableOpacity>
        </View>
        {registrationError && (
          <Text style={{ color: "red", textAlign: "center", marginBottom: 10 }}>
            {registrationError}
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
