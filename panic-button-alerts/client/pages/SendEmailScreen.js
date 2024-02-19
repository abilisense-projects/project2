import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

import axios from "../services/axiosInstance";
import validateEmail from "../services/ValidateEmail";
import CustomButton from "../components/cors/CustomButton";
import Container from "../components/cors/ContainerPage";
import CustomHeader from "../components/Navigation/CustomHeader";

const SendEmail = ({ route }) => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const isHebrew = i18n.language === "he";

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendResetEmail();
    }
  };

  const handleSendResetEmail = async () => {
    if (!validateEmail(email)) {
      setMessage(t("Please enter a valid email address."));
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
          t("Reset email sent. Check your email for further instructions.")
        );
        setIsError(false);
      } else {
        setMessage(
          t(
            "An error occurred while sending the reset email. Please try again."
          )
        );
        setIsError(true);
      }
    } catch (error) {
      console.error("Error sending reset email:", error.message);
      setMessage(t("An error occurred while sending the reset email."));
      setIsError(true);
    }
  };

  return (
    <Container>
      <CustomHeader/>
      <TextInput
        style={[styles.input, isHebrew && styles.rtlInput]}
        placeholder={t("Enter Email")}
        value={email}
        onChangeText={(text) => setEmail(text)}
        onKeyPress={handleKeyPress}
      />
      <CustomButton
        label={t("Send Reset Email")}
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
    </Container>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "75%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  rtlInput: {
    textAlign: "right",
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
