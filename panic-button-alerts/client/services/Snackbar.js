import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Snackbar = ({
  actionText,
  onActionPress,
  position = "bottom",
  containerStyle,
  messageStyle,
  actionTextStyle,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [snackbarState, setSnackbarState] = useState({
    message: "",
    backgroundColor: "",
    textColor: "",
  });

  const showSnackbar = (message, backgroundColor, textColor) => {
    setSnackbarState({
      message,
      backgroundColor,
      textColor,
    });

    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Default duration in milliseconds
  };

  useEffect(() => {
    // You can perform additional actions when the Snackbar is visible or hidden
    // For example, you might want to do something when the Snackbar is hidden
    // by calling `onHide` prop here.
  }, [isVisible]);

  return isVisible ? (
    <View
      style={[
        styles.container,
        position === "top" ? styles.topContainer : styles.bottomContainer,
        containerStyle,
        { backgroundColor: snackbarState.backgroundColor },
      ]}
    >
      <Text style={[styles.messageText, messageStyle, { color: snackbarState.textColor }]}>
        {snackbarState.message}
      </Text>
      {actionText && (
        <TouchableOpacity onPress={onActionPress}>
          <Text style={[styles.actionText, actionTextStyle]}>{actionText}</Text>
        </TouchableOpacity>
      )}
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    left: 0,
    right: 0,
  },
  topContainer: {
    top: 15,
  },
  bottomContainer: {
    bottom: 15,
  },
  messageText: {
    fontSize: 16,
  },
  actionText: {
    marginLeft: 8,
    fontSize: 14,
  },
});


export default Snackbar;
