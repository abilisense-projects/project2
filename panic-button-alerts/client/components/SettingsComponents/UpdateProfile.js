import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Animated,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import axiosInstance from "../../services/axiosInstance";
import { decodeToken } from "../../services/JwtService";
import { remove, save } from "../../services/Storage";

const UpdateProfile = ({ isVisible, onRequestClose, details = {} }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const nameLabelAnimation = useState(new Animated.Value(0))[0];
  const emailLabelAnimation = useState(new Animated.Value(0))[0];

  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);

  useEffect(() => {
    animateLabel(name, nameLabelAnimation);
    animateLabel(email, emailLabelAnimation);
  }, [name, email]);

  const animateLabel = (value, animatedValue) => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const getLabelPosition = (animatedValue) => ({
    position: "absolute",
    left: 0,
    top: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [30, -5],
    }),
    fontSize: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 14],
    }),
    color: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["#aaa", "#000"],
    }),
    opacity: animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0, 1],
    }),
  });

  const focusOnInput = (inputRef) => {
    inputRef.current && inputRef.current.focus();
  };

  const handleConfirm = async () => {
    try {
      id = details._id;
      const response = await axiosInstance.post("/user/", {
        userId,
        name,
        email,
      });
      if (response.data.token !== "not updated") {
        await remove("accessToken");
        await save("accessToken", response.data.token);
      }
    } catch (error) {}
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={onRequestClose}>
            <FeatherIcon name="x" size={24} color="#000" />
          </TouchableOpacity>

          <View style={styles.inputContainer}>
            <TouchableOpacity onPress={() => focusOnInput(nameInputRef)}>
              <Animated.Text
                style={[styles.label, getLabelPosition(nameLabelAnimation)]}
              >
                Name
              </Animated.Text>
            </TouchableOpacity>
            <TextInput
              ref={nameInputRef}
              style={styles.input}
              onChangeText={setName}
              value={name}
              placeholder={details.name}
              onFocus={() => animateLabel(name, nameLabelAnimation)}
              onBlur={() => animateLabel(name, nameLabelAnimation)}
            />
          </View>

          <View style={styles.inputContainer}>
            <TouchableOpacity onPress={() => focusOnInput(emailInputRef)}>
              <Animated.Text
                style={[styles.label, getLabelPosition(emailLabelAnimation)]}
              >
                Email
              </Animated.Text>
            </TouchableOpacity>
            <TextInput
              ref={emailInputRef}
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              placeholder={details.name}
              onFocus={() => animateLabel(email, emailLabelAnimation)}
              onBlur={() => animateLabel(email, emailLabelAnimation)}
            />
          </View>

          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirm}
          >
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  inputContainer: {
    alignSelf: "stretch",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    paddingTop: 25,
    fontSize: 18,
    backgroundColor: "#f7f7f7",
  },
  label: {
    position: "absolute",
    left: 15,
    top: -10,
    backgroundColor: "white",
    paddingHorizontal: 4,
    fontSize: 16,
    color: "#8a8a8a",
  },
  confirmButton: {
    backgroundColor: "#4e9af1",
    borderRadius: 20,
    padding: 10,
    width: "80%",
    alignItems: "center",
    marginTop: 20,
  },
  confirmButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default UpdateProfile;
