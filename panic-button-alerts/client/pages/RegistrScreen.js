import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import CustomButton from "../services/CustomButton";
import ValidateEmail from "../services/ValidateEmail";
import validatePassword from "../services/ValidatePassword";
import axios from "../services/axiosInstance";
import Loader from "../components/Loader";


const RegisterScreen = ({ route }) => {
  // State variables to store form inputs,
  // errors, and form validity
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [registrationError, setRegistrationError] = useState(null);

  const [loading, setLoading] = useState(false);
  const [validationResults, setValidationResults] = useState({
    length: false,
    number: false,
    specialChar: false,
    // match: false,
  });

  useEffect(() => {
    // Trigger form validation when name,
    // email, or password changes
    validateForm();
  }, [name, email, password]);

  const validateForm = () => {
    let errors = {};

    // Validate name field
    if (!name) {
      errors.name = "Name is required.";
    }

    // Validate email field
    if (!email) {
      errors.email = "Email is required.";
    } else if (!ValidateEmail(email)) {
      errors.email = "Email is invalid.";
      console.warn(!validationResults === false);
    }
    setValidationResults(validatePassword(password));
    // Validate password field
    if (!password) {
      errors.password = "Password is required.";
    } else if (
      !(
        validationResults.length &
        validationResults.number &
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

    // Set the errors and update form validity
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };
  const registration = async () => {
    try {
      const user = {
        name,
        email,
        password,
      };

      // Make a POST request to your server endpoint
      const response = await axios.post("/auth/register", user);
      setLoading(false);

      // Check if the registration was successful based on your server's response
      if (response.status === 200 || response.status === 201) {
        console.log("Registration successful:", response.data);
        // Optionally, navigate to a success screen or perform other actions
        navigation.navigate("Login");
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
        if (error.response.status === 400) {
          setRegistrationError(error.response.data);
        }
        // Update state with a more user-friendly error message
        else
          setRegistrationError(
            "Registration failed. Please check your details and try again."
          );
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        // Update state with a more user-friendly error message
        setRegistrationError(
          "Network error. Please check your internet connection."
        );
      } else {
        setLoading(false);

        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
        // Update state with a more user-friendly error message
        setRegistrationError(
          "An unexpected error occurred. Please try again later."
        );
      }
    }
  };

  const handleSubmit = () => {
    if (isFormValid) {
      registration();
      console.log("Form submitted successfully!");
    } else {
      // Form is invalid, display error messages
      console.log("Form has errors. Please correct them.");
    }
  };

  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      {/* {route.params && <Text>Deep Link Params: {JSON.stringify(route.params)}</Text>}  */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <CustomButton
        label={"submit"}
        style={[{ opacity: isFormValid ? 1 : 0.3 }]}
        disabled={!isFormValid}
        onPress={handleSubmit}
      ></CustomButton>

      {/* Display error messages */}
      {Object.values(errors).map((error, index) => (
        <Text key={index} style={styles.error}>
          {error}
        </Text>
      ))}
      {registrationError && (
        <Text style={styles.error}>
          {registrationError}
        </Text>
      )}
       <Text style={{alignSelf:"center"}}
          label={"go to login"}
          onPress={() => navigation.navigate("Login")}
        >
         already register ? login!
        </Text>
    </View>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems:'center'
  },
  input: {
    width: "75%", // Adjusted width
    height: 40, // Adjusted height
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  error: {
    // alignSelf:'center',
    color: "red",
    fontSize: 20,
    marginBottom: 12,
  },
});

export default RegisterScreen;
