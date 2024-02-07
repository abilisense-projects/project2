import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import CustomButton from "../components/cors/CustomButton";
import ValidateEmail from "../services/ValidateEmail";
import validatePassword from "../services/ValidatePassword";
import axios from "../services/axiosInstance";
import Loader from "../components/cors/Loader";
import { useTranslation } from "react-i18next";
import Container from "../components/cors/ContainerPage";
import CustomHeader from "../components/Navigation/CustomHeader";

export default function RegisterScreen ({ navigation })  {
  // State hooks for form fields and validation
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
  });

  // Translation hook
  const { t, i18n } = useTranslation();
  const isHebrew = i18n.language === "he";

  // Function to validate the form
  const validateForm = () => {
    let errors = {};
    // Name validation
    if (!name) errors.name = t("Name is required.");
    // Email validation
    if (!email) errors.email = t("Email is required.");
    else if (!ValidateEmail(email)) errors.email = t("Email is invalid.");
    // Password validation
    setValidationResults(validatePassword(password));
    if (!password) errors.password = t("Password is required.");
    else {
      if (!validationResults.length)
        errors.passwordlength = t("Password must be at least 8 characters.");
      if (!validationResults.number)
        errors.passwordnumber = t("Password must contain 1 number.");
      if (!validationResults.specialChar)
        errors.passwordchar = t("Password must contain 1 special character.");
    }
    // Update errors and form validity
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    validateForm();
    if (isFormValid) {
      setLoading(true);
      try {
        const user = { name, email, password };
        const response = await axios.post("/auth/register", user);
        setLoading(false);
        if (response.status === 200 || response.status === 201) {
          navigation.navigate("Login");
        } else {
          console.error("Unexpected server response:", response);
        }
      } catch (error) {
        setLoading(false);
        handleRegistrationError(error);
      }
    } else {
      console.log("Form has errors. Please correct them.");
    }
  };

  // Function to handle registration errors
  const handleRegistrationError = (error) => {
    if (error.response) {
      setRegistrationError(error.response.data);
    } else if (error.request) {
      setRegistrationError(
        t("Network error. Please check your internet connection.")
      );
    } else {
      setRegistrationError(
        "An unexpected error occurred. Please try again later."
      );
    }
  };

  // Check for RTL language

  return (
    <Container>
      <CustomHeader/>
      <Loader loading={loading} />
      <TextInput
        style={[
          styles.input,
          isHebrew && styles.rtlInput,
          errors.name && styles.invalidInput,
        ]}
        placeholder={t("Name")}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={[
          styles.input,
          isHebrew && styles.rtlInput,
          errors.email && styles.invalidInput,
        ]}
        placeholder={t("Email")}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[
          styles.input,
          isHebrew && styles.rtlInput,
          errors.password && styles.invalidInput,
        ]}
        placeholder={t("Password")}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {Object.values(errors).map((error, index) => (
        <Text key={index} style={styles.error}>
          {error}
        </Text>
      ))}
      {registrationError && (
        <Text style={styles.error}>{registrationError}</Text>
      )}
      <CustomButton
        label={t("submit")}
        style={{ opacity: isFormValid ? 1 : 0.3 }}
        disabled={!isFormValid}
        onPress={handleSubmit}
      />
    </Container>
  );
};
// Styles for the components
const styles = StyleSheet.create({
  input: {
    width: "75%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  invalidInput: {
    borderColor: "red",
  },
  rtlInput: {
    textAlign: "right",
  },
  error: {
    color: "red",
    fontSize: 20,
    marginBottom: 12,
  },
});

