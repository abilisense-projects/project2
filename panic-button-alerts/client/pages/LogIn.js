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
      setIsEmailValid(ValidateEmail(email));

      if (!isEmailValid) {
        console.error("Invalid email format");
        return;
      }
      setConfirmPassword(password)
      const isPasswordValid = ValidatePassword(password);
      if (!isPasswordValid) {
        console.error("Invalid password format");
        return;
      }

      const response = await axios.post("/auth/login", { email, password })
      if (response.data.message === 'Login Success') {
        // dispatch(loginSuccess(response.user));
        // storeTokens(response.data.token, {})
        <Snackbar
        message="This is a custom Snackbar"
        actionText="Dismiss"
        onActionPress={() => {
          // Implement the action logic here.
        }}
        duration={5000} // Customize duration
        position="bottom" // Change the position to 'top'/'bottom'
        backgroundColor="#2E67F8" // Customize background color
        textColor="white" // Change text color
        actionTextColor="white" // Customize action text color
        containerStyle={{ marginHorizontal: 12 }} // Apply additional styling
        messageStyle={{ }} // Adjust message text styling
        actionTextStyle={{ }} // Customize action text styling
      />
        navigation.navigate('DrawerNavigationRoutes');
       
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

