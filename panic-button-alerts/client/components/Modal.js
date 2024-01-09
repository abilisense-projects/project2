// LogoutModal.js
import React from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const MyModal = ({ text, visible, onConfirm, onCancel }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{text}</Text>
          <View style={styles.modalButtons}>
            <Pressable onPress={onCancel}>
              <AntDesign name="closecircle" size={30} color="red" />
            </Pressable>
            <Pressable onPress={onConfirm}>
              <AntDesign name="checkcircle" size={30} color="green" />
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default MyModal;
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    marginTop: 20,
  },
});


