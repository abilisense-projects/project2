import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Pressable,
  
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "../../services/axiosInstance";
import CustomButton from "../../services/CustomButton";
import ValidatePassword from "../../services/ValidatePassword";
import Snackbar from "../../services/snackbar";

const ResetPassword = ({ route, navigation }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const [tokenVerified, setTokenVerified] = useState(false);
  const [isResetSuccess, setIsResetSuccess] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [validationResults, setValidationResults] = useState({
    length: false,
    number: false,
    specialChar: false,
    // match: false,
  });
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleResetPassword();
    }
  };
  const handleResetPassword = async () => {
    setMessage(null);
    if (
      !(
        validationResults.length &
        validationResults.number &
        validationResults.specialChar
      )
    ) {
      return;
    }
    if (confirmPassword !== password) {
      setMessage(t("confirmd password not matching"));
      return;
    }
    try {
      var parsedUrl = new URL(window.location.href);
      const token = parsedUrl.searchParams.get("token");
      const id = parsedUrl.searchParams.get("id");
      const response = await axios.post("/auth/resetPassword", {
        userid: id,
        token: token,
        password,
      });

      if (response.data.success) {
       
        setMessage(
          t("Password reset successful. You can now log in with your new password.")
        );
        
        setIsResetSuccess(true);
        navigation.navigate("LoginScreen");
      } else {
        setMessage(t("Something went wrong. Please try again later."));
      }
    } catch (error) {
      console.error("Error resetting password:", error.message);
      setMessage(
       t( "An error occurred while resetting the password,check password again...")
      );
    }
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
    setValidationResults(ValidatePassword(password));
  };

  const handleConfirmPasswordChange = (confirmPassword) => {
    setConfirmPassword(confirmPassword);
  };

  return (
    <View style={styles.container}>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder={t("Enter New Password")}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={handlePasswordChange}
          onKeyPress={handleKeyPress}

        />
        <Pressable
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="black"
          />
        </Pressable>
      </View>

      {renderValidationItem(t("Minimum 8 characters"), validationResults.length)}
      {renderValidationItem(t("At least 1 number"), validationResults.number)}
      {renderValidationItem(
        t("At least 1 special character"),
        validationResults.specialChar
      )}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder={t("Confirm New Password")}
          secureTextEntry={!showPassword}
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
          onKeyPress={handleKeyPress}

        />
        <Pressable
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="black"
          />
        </Pressable>
      </View>
      {/* {renderValidationItem("Passwords match", password===confirmPassword)} */}
      <CustomButton label={t("Send me link")} onPress={handleResetPassword} />

      
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const renderValidationItem = (text, isValid) => (
  <View style={styles.validationItem}>
    <Text style={{ color: isValid ? "green" : "red" }}>
      {isValid ? "✅" : "❌"}
    </Text>
    <Text style={{ marginLeft: 8 }}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderColor: "gray",
    borderWidth: 1,
    padding: 8,
  },
  eyeIcon: {
    padding: 8,
  },
  validationItem: {
    flexDirection: "row",
    alignItems: "center",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  button: {
    marginTop: 12,
  },
  message: {
    marginTop: 12,
    color: "red", // or any other color you prefer for error messages
  },
});

export default ResetPassword;
