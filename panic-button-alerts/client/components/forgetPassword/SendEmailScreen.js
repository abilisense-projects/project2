import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import axios from "../../services/axiosInstance";
import validateEmail from "../../services/ValidateEmail";
import CustomButton from "../../services/CustomButton";

const SendEmail = ({ route }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendResetEmail();
    }
  };

  const handleSendResetEmail = async () => {
    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address.");
      setIsError(true);
      return;
    }

    try {
      // Send a request to the server to initiate the password reset process
      const response = await axios.post("auth/requestResetPassword", {
        email,
      });

      if (response.data != null) {
        setMessage(
          "Reset email sent. Check your email for further instructions."
        );
        setIsError(false);
      } else {
        setMessage(
          "An error occurred while sending the reset email. Please try again."
        );
        setIsError(true);
      }
    } catch (error) {
      console.error("Error sending reset email:", error.message);
      setMessage("An error occurred while sending the reset email.");
      setIsError(true);
    }
  };

  return (
    <View style={styles.container}>
      {route.params && (
        <Text>Deep Link Params: {JSON.stringify(route.params)}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        onKeyPress={handleKeyPress}
      />
      <CustomButton
        label="Send Reset Email"
       
        onPress={handleSendResetEmail}
      />
      {message ? (
        <Text
          style={[
            styles.message,
            isError ? styles.errorMessage : styles.successMessage,
          ]}
        >
          {message}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  message: {
    marginTop: 20,
  },
  errorMessage: {
    color: "red",
  },
  successMessage: {
    color: "purple",
  },
});

export default SendEmail;
