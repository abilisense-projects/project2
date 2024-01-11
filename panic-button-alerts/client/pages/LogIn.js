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
// import { loginSuccess } from '../redux/actions/loginActions';
import * as Yup from "yup";
import { loginValidation } from "../loginValidation";
const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const handleLogin = async () => {
    try {
      //validate the email and password valid
      await loginValidation.validate(
        { email, password },
        { abortEarly: false }
      );
      console.log("after handlogin ");
      // Runs the function that accesses the database and waits for an answer
      const response = await axios.post("/auth/login", { email, password });
      console.log("after checkEmailAndpassword", response);
      if (response.data.message === "Login Success") {
        console.log("if ", response);
        navigation.navigate("Home");
      } else {
        // if the response is not good there is a error on login
        console.log("else ", response);
        setErrorMessage("user name or password invalid");
      }
      // if there is error show them
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const yupErrors = {};
        error.inner.forEach((e) => {
          yupErrors[e.path] = e.message;
        });
        setErrors(yupErrors);
      }
      setErrorMessage('user name or password invalid');
    }


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
          setErrors((prevErrors) => ({ ...prevErrors, email: "" })); // Merge state updates
        }}
        value={email}
      />
      <TextInput
        style={[styles.input, errors.password && styles.invalidInput]}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => {
          setPassword(text);
          setErrors((prevErrors) => ({ ...prevErrors, password: "" })); // Merge state updates
        }}
        value={password}
      />
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
  },
});
export default Login;

