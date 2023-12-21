import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  AsyncStorage,
} from "react-native";
import CustomButton from "../services/CustomButton";

const Login = ({ route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true); // State to track email validation
  const [isPasswordValid, setIsPasswordValid] = useState(true); // State to track password validation

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Password length validation (minimum 6 characters)
    const isLengthValid = password.length >= 6;

    // Password special character validation
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const hasSpecialCharacter = specialCharacterRegex.test(password);

    // Password alphanumeric validation
    const alphanumericRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])/;
    const isAlphanumeric = alphanumericRegex.test(password);

    // Update password validation state
    setIsPasswordValid(isLengthValid && hasSpecialCharacter && isAlphanumeric);

    return isLengthValid && hasSpecialCharacter && isAlphanumeric;
  };

  const handleLogin = async () => {
    try {
      // Validate email format
      setIsEmailValid(validateEmail(email));

      if (!isEmailValid) {
        console.error("Invalid email format");
        return;
      }

      // Validate password
      if (!validatePassword(password)) {
        console.error("Invalid password format");
        return;
      }

      // Connect to MongoDB and verify user credentials
      // Replace the next line with the actual logic for connecting to MongoDB
      // const user = await usersCollection.findOne({ email, password });
      const user = { username: "test" }; // Example user object

      if (!user) {
        console.error("Invalid credentials");
        return;
      }

      // Create JWT token
      // Replace the next line with the actual logic for creating a JWT token
      // const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
      const token = "example_token"; // Example token

      // Store token in local storage and navigate to the home screen
      // Replace the next line with the actual logic for storing the token
      // await AsyncStorage.setItem('token', token);
      console.log("Login successful");
      navigation.navigate("Home");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View style={styles.container}>
      {route.params && <Text>Deep Link Params: {JSON.stringify(route.params)}</Text>} 
      <Text style={styles.header}>Login</Text>
      <TextInput
        style={[styles.input, !isEmailValid && styles.invalidInput]}
        placeholder="Email"
        onChangeText={(text) => {
          setEmail(text);
          // Reset email validation on input change
          setIsEmailValid(true);
        }}
        value={email}
      />
      {!isEmailValid && (
        <Text style={styles.warningText}>Invalid email format</Text>
      )}
      <TextInput
        style={[styles.input, !isPasswordValid && styles.invalidInput]}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => {
          setPassword(text);
          // Reset password validation on input change
          setIsPasswordValid(true);
        }}
        value={password}
      />
      {!isPasswordValid && (
        <Text style={styles.warningText}>
          Password must be at least 6 characters long and include at least one
          special character and one number.
        </Text>
      )}
      <View style={{ flexDirection: "row" }}>
        <Text
          style={styles.forgotPassword}
          onPress={() => navigation.navigate("SendEmail")}
        >
          Forgot Password?
        </Text>
        <Text
          style={styles.register}
          onPress={() => navigation.navigate("Register")}
        >
          Register
        </Text>
      </View>

      <CustomButton label={"Login"} onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "25%",
    height: 20,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  invalidInput: {
    borderColor: "red",
  },
  warningText: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
  },
  forgotPassword: {
    fontSize: 16,
    color: "blue",
    textDecorationLine: "underline",
    marginBottom: 10,
  },
  register: {
    fontSize: 16,
    color: "blue",
    textDecorationLine: "underline",
    marginLeft: 20,
  },
});

export default Login;
