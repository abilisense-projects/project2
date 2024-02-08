import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
// Helper function to format time into HH:MM:SS
const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  // Pad the time values with leading zeros
  const pad = (value) => (value < 10 ? `0${value}` : value);
  return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
};
// TimerModal component
export default function TimerModal({ isVisible, onTime, onClose }) {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    let timer;
    if (isVisible) {
      // Start the timer when the modal is visible
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      // Clear the timer when the modal is not visible
      onTime(seconds);
      clearInterval(timer);
    }
    // Clean up the timer on component unmount
    return () => clearInterval(timer);
  }, [isVisible, onTime]);
  const handleClose = () => {
    // Close the modal and reset the timer
    setSeconds(0);
    onClose();
  };
  return (
    <View
      style={styles.modalContainer}
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={handleClose}
    >
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{formatTime(seconds)}</Text>
        {/* Uncomment below to add a close button */}
        {/* <Pressable onPress={handleClose}>
          <Text style={styles.closeButton}>Close</Text>
        </Pressable> */}
      </View>
    </View>
  );
};
// Styles
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  timerContainer: {
    backgroundColor: '#000', // Black background for the digital look
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    marginTop: '50%',
  },
  timerText: {
    fontSize: 48, // Larger font size for the digital watch look
    color: 'red', // Red color to match the example image
    fontFamily: 'DS-Digital', // A digital-look font, ensure it is linked in your project
  },
  closeButton: {
    color: 'blue',
    fontSize: 16,
  },
});
