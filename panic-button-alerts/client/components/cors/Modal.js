import { View, Modal, Text, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const MyModal = ({ text, visible, onCancel, onConfirm, action }) => {
  const { t, i18n } = useTranslation();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{text}</Text>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={onConfirm}>
              <Text style={styles.buttonText}>{action}</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={onCancel}>
              <Text style={styles.buttonText}>{t("Cancel")}</Text>
            </Pressable>
          </View>
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
    marginTop: 22,
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
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "blue",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default MyModal;
