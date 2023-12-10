import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const EmailVartification = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSendResetEmail = async () => {
    if (!validateEmail()) {
      setMessage('Please enter a valid email address.');
      return;
    }

    try {
      // Send a request to the server to initiate the password reset process
      const response = await axios.post('YOUR_NODE_SERVER_ENDPOINT/reset-password', {
        email,
      });

      if (response.data.success) {
        setMessage('Reset email sent. Check your email for further instructions.');
      } else {
        setMessage('Wrong email, Please check your email address.');
      }
    } catch (error) {
      console.error('Error sending reset email:', error.message);
      setMessage('An error occurred while sending the reset email.');
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Button title="Send Reset Email" onPress={handleSendResetEmail} />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  message: {
    marginTop: 20,
    color: 'red', 
  },
});

export default EmailVartification;
