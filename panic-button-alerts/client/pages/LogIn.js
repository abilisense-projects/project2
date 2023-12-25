import { View, Text, TextInput, StyleSheet, AsyncStorage, TouchableOpacity } from "react-native";
import CustomButton from "../services/CustomButton";
import ValidateEmail from "../services/ValidateEmail";
import ValidatePassword from "../services/ValidatePassword";
import { useState } from "react";
import axios from '../services/axiosInstance';
// import { BY_EMAIL_AND_PASSWORD, SERVER_BASE_URL } from '@env';
const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Added confirmPassword state
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [validationResults, setValidationResults] = useState({
    length: true,
    number: true,
    specialChar: true,
    match: true,
  });


const updateValidationResult = (fieldName, value) => {
  setValidationResults(prevState => ({
    ...prevState,
    [fieldName]: value,
  }));
};


  const handleLogin = async () => {
    try {
      setIsEmailValid(ValidateEmail(email));

      if (!isEmailValid) {
        console.error("Invalid email format");
        return;
      }
      console.log("b-4 validate password")
      setConfirmPassword(password)
      const isPasswordValid = ValidatePassword(password);
      console.log("came validate password")
      if (!isPasswordValid) {
        console.error("Invalid password format");
        return;
      }

      const response = axios.post("/auth/login", { email, password })
      .then(response => {
        console.log('Data in checkEmailAndpassword:', response.data);
        return response.data
      })
      console.log(response)


      
      const user = { username: "test" }; // Example user object

      if (!user) {
        console.error("Invalid credentials");
        return;
      }

      const token = "example_token"; // Example token

      // Store token in local storage and navigate to the home screen
      console.log("Login successful");
      navigation.navigate("Home");
    } catch (error) {
      // console.error(error.message);
    }
    const sendTOServer = async() => {
    
      console.log("came to axios")
      // const url = SERVER_BASE_URL + BY_EMAIL_AND_PASSWORD;
       await axios.post("/auth/login", { email, password })
        .then(response => {
          console.log('Data in checkEmailAndpassword:', response.data);
          return response.data
        })
     
    }
    
  };

  return (
    <View style={styles.container}>
      {/* {route.params && <Text>Deep Link Params: {JSON.stringify(route.params)}</Text>}  */}
      <Text style={styles.header}>Login</Text>
      <TextInput
        style={[styles.input, !isEmailValid && styles.invalidInput]}
        placeholder="Email"
        onChangeText={(text) => {
          setEmail(text);
          setIsEmailValid(true);
        }}
        value={email}
      />
      {!isEmailValid && (
        <Text style={styles.warningText}>Invalid email format</Text>
      )}
      <TextInput
        style={[
          styles.input,
          !validationResults.length && styles.invalidInput,
        ]}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => {
          setPassword(text);
          updateValidationResult('length', true); // לדוגמא, מעדכן את הערך של length להיות false

        }}
        value={password}
      />
      
      {!validationResults.length && (
        <Text style={styles.warningText}>
          Password must be at least 8 characters long.
        </Text>
      )}
      
      {!validationResults.match && (
        <Text style={styles.warningText}>Passwords do not match.</Text>
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

      <CustomButton label={"Login"} onPress={handleLogin} ></CustomButton>
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
    width: "75%", // Adjusted width
    height: 40, // Adjusted height
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
