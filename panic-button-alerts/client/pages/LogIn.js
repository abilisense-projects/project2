import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "../services/axiosInstance";
import validatePassword from "../services/ValidatePassword";
import ValidateEmail from "../services/ValidateEmail";
import CustomButton from "../services/CustomButton";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";
import { save } from "../services/Storage";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
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
          await save("accessToken", response.data.token);
          navigation.replace("DrawerNavigationRoutes");
          Toast.show({
            type: "success",
            text1: t("Login successful"),
          });
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
    <View style={styles.container}>
      <Text style={styles.title}>{t("Login")}</Text>
      <TouchableOpacity
        style={styles.registerContainer}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.register}>{t("Register")}</Text>
      </TouchableOpacity>
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
      <TextInput
        style={[
          styles.input,
          errors.password && styles.invalidInput,
          isHebrew && styles.rtlInput,
        ]}
        placeholder={t("Password")}
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      {Object.values(errors).map((error, index) => (
        <Text key={index} style={styles.errorMessage}>
          {error}
        </Text>
      ))}

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <CustomButton label={"Login"} onPress={handleLogin} />
      )}

      <TouchableOpacity onPress={() => navigation.navigate("SendEmail")}>
        <Text style={styles.forgotPassword}>{t("Forgot Password?")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
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
    color: "#ac00e6",
    textDecorationLine: "underline",
  },
  forgotPassword: {
    fontSize: 16,
    color: "#ac00e6",
    textDecorationLine: "underline",
    marginTop: 10,
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
