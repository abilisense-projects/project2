// import { React, useState, useEffect } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// export default function Timer() {
//     useEffect(() => { startTimer() },[])
//     const [state, setState] = useState({ time: 0, })
//    function startTimer() {
//     const interval = setInterval(() => {
//             setState(state => ({
//                 time: state.time + 1,
//             }));
//         }, 1000);
//         return () => clearInterval(interval);
//     };
//     function  stopTimer  (){
//         clearInterval(this.interval);
//     };

//import { View } from "react-native";

   
//         return (
//             <View>
//                 <Text>{state.time}</Text>
//             </View>
//         );
    
// }
// const styles = StyleSheet.create({
//     row: {
//         display: 'flex',
//     },
//     time: {
//         fontSize: 48,
//         fontWeight: 'bold',
//         color: '#272727'
//     }
// })

import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const pad = (value) => (value < 10 ? `0${value}` : value);

  return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
};

export default  function TimerModal({ isVisible, onClose }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let timer;

    if (isVisible) {
      // Start the timer when the modal is visible
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      // Clear the timer when the modal is closed
      clearInterval(timer);
    }

    // Clean up the timer on component unmount
    return () => clearInterval(timer);
  }, [isVisible]);

  const handleClose = () => {
    // Close the modal and reset the timer
    setSeconds(0);
    onClose();
  };

  return (
    <View
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={handleClose}
    >
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{formatTime(seconds)}</Text>
          {/* <TouchableOpacity onPress={handleClose}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity> */}
      </View>
     </View>
  );
};

const styles = StyleSheet.create({
    // modalContainer: {
    //   flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // },
    timerContainer: {
      
      backgroundColor: 'white',
      padding: '2%',
      borderRadius: 10,
      alignItems: 'center',
    },
    timerText: {
      fontSize: 20,
     // marginBottom: 10,
    },
    closeButton: {
      color: 'blue',
      fontSize: 16,
    },
  });
  