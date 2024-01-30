
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "../services/axiosInstance";
import validatePassword from "../services/ValidatePassword";
import ValidateEmail from "../services/ValidateEmail";

const Login = ({ navigation }) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [validationResults, setValidationResults] = useState({
    length: false,
    number: false,
    specialChar: false,
  });
  const handleLogin = async () => {



    if (!email) {
      errors.email = "Email is required.";
    } else if (!ValidateEmail(email)) {
      errors.email = "Email is invalid.";
    }
    setValidationResults(validatePassword(password));

    if (!password) {
      errors.password = "Password is required.";
    } else if (
      !(
        validationResults.length ||
        validationResults.number ||
        validationResults.specialChar
      )
    ) {
      if (!validationResults.length)
        errors.passwordlength = "Password must be at least 8 characters. ";
      if (!validationResults.number) {
        errors.passwordnumber = "password must contain 1 number;";
      }

      if (!validationResults.specialChar) {
        errors.passwordchar = "password must contain 1 special carracter;";
      }

    }
    




    console.log("gfyf");
    const response = await axios.post("/auth/login", { email, password });
    console.log("after checkEmailAndpassword", response);
    if (response.data.message === "Login Success") {
      console.log("if ", response);
      navigation.replace("DrawerNavigationRoutes");
    } else {

      console.log("else ", response);

    }
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TouchableOpacity
        style={styles.registerContainer}
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: "Register" }],
          });
        }}
      >
        <Text style={styles.register}>Register</Text>
      </TouchableOpacity>
      <TextInput
        style={[styles.input, errors.email && styles.invalidInput]}
        placeholder="Email"
        onChangeText={(text) => {
          setEmail(text);

        }}
        value={email}
      />
      <TextInput
        style={[styles.input, errors.password && styles.invalidInput]}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => {
          setPassword(text);

        }}
        value={password}

      />
      {Object.values(errors).map((error, index) => (
        <Text key={index} style={styles.errorMessage}>
          {error}
        </Text>
      ))}
      
      <View style={styles.forgotPasswordContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("PasswordReset")}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "75%", // Adjusted width
    height: 40, // Adjusted height
    borderColor: "gray",
    width: "75%", // Adjusted width
    height: 40, // Adjusted height
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  inputContainer: {
    marginBottom: 20,
    width: "80%",
  },
  invalidInput: {
    borderColor: "red",
    borderColor: "red",
  },
  warningText: {
    color: "red",
    color: "red",
    fontSize: 12,
    marginBottom: 5,
  },
  forgotPasswordContainer: {
    fontSize: 16,
    color: "#ac00e6",
    textDecorationLine: "underline",
    marginBottom: 10,
  },
  register: {
    fontSize: 16,
    color: "#ac00e6",
    textDecorationLine: "underline",
    marginLeft: 20,
  },
  registerContainer: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  forgotPassword: {
    fontSize: 16,
    color: "#ac00e6",
    textDecorationLine: "underline",
  },
  errorMessage: {
    color: "red",
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: "#ac00e6",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  }
});
export default Login;

