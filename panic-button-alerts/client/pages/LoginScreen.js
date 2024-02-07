import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "../services/axiosInstance";
import validatePassword from "../services/ValidatePassword";
import ValidateEmail from "../services/ValidateEmail";
import CustomButton from "../components/cors/CustomButton";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";
import { save } from "../services/Storage";
import CustomHeader from "../components/Navigation/CustomHeader";
import Container from "../components/cors/ContainerPage";
import Loader from "../components/cors/Loader";
import { Ionicons } from "@expo/vector-icons";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t, i18n } = useTranslation();

  const handleLogin = async () => {
    let currentErrors = {};
    let isValid = true;

    // Validate email
    if (!email) {
      currentErrors.email = "Email is required.";
      isValid = false;
    } else if (!ValidateEmail(email)) {
      currentErrors.email = "Email is invalid.";
      isValid = false;
    }

    // Validate password
    const passwordValidationResults = validatePassword(password);
    if (!password) {
      currentErrors.password = "Password is required.";
      isValid = false;
    } else {
      if (!passwordValidationResults.length) {
        currentErrors.passwordlength =
          "Password must be at least 8 characters.";
        isValid = false;
      }
      if (!passwordValidationResults.number) {
        currentErrors.passwordnumber = "Password must contain 1 number.";
        isValid = false;
      }
      if (!passwordValidationResults.specialChar) {
        currentErrors.passwordchar =
          "Password must contain 1 special character.";
        isValid = false;
      }
    }

    setErrors(currentErrors);

    if (isValid) {
      try {
        setIsLoading(true);
        const response = await axios.post("/auth/login", { email, password });
        setIsLoading(false);
        if (response.data.message === "Login Success") {
          Toast.show({
            type: "success",
            text1: t("Login successful"),
          });
          await save("accessToken", response.data.token);

          await navigation.replace("DrawerNavigationRoutes");
        } else {
          // Handle login failure
          Toast.show({
            type: "error",
            text1: t("Login failed"),
            text2: response.data.message || t("An unexpected error occurred."),
          });
        }
      } catch (error) {
        setIsLoading(false);
        Toast.show({
          type: "error",
          text1: t("Login failed"),
          text2: error.message || t("An unexpected error occurred."),
        });
      }
    }
  };
  const isHebrew = i18n.language === "he";

  return (
    <Container>
      <CustomHeader />
      <Text style={styles.title}>{t("Login")}</Text>
      <Pressable
        style={styles.registerContainer}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.register}>{t("Register")}</Text>
      </Pressable>
      <TextInput
        style={[
          styles.input,
          errors.email && styles.invalidInput,
          isHebrew && styles.rtlInput,
        ]}
        placeholder={t("Email")}
        onChangeText={setEmail}
        value={email}
      />
      {/* <View style={styles.container}> */}
        <TextInput
          style={[
            styles.input,
            errors.password && styles.invalidInput,
            isHebrew && styles.rtlInput,
          ]}
          placeholder={t("Password")}
          secureTextEntry={!showPassword}
          onChangeText={setPassword}
          value={password}
        />
        {/* <Ionicons
          name={showPassword ? "eye-off" : "eye"}
          size={24}
          color="black"
          style={styles.icon}
          onPress={() => setShowPassword(!showPassword)}
        /> */}
      {/* </View> */}
      <Pressable
        style={{ textAlign: "right" }}
        onPress={() => navigation.navigate("SendEmail")}
      >
        <Text style={[styles.forgotPassword, isHebrew && styles.rtlInput]}>
          {t("Forgot Password?")}
        </Text>
      </Pressable>
      {Object.values(errors).map((error, index) => (
        <Text key={index} style={styles.errorMessage}>
          {error}
        </Text>
      ))}
      <CustomButton label={t("Login")} onPress={handleLogin} />

      <Loader loading={isLoading} />
    </Container>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  
  container: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    // justifyContent: 'center', 
    // backgroundColor: '#f3f3f3', 
    // borderRadius: 8, 
    paddingHorizontal: 14, 
}, 
  icon: {
    marginRight: 20,
  },
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
  registerContainer: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  register: {
    fontSize: 16,
    color: "#E33458",
    textDecorationLine: "underline",
  },
  forgotPassword: {
    fontSize: 14,
    color: "#E33458",
    textDecorationLine: "underline",
  },
  errorMessage: {
    color: "red",
    marginBottom: 10,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
