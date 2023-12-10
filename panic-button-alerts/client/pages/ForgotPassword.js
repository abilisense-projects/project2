import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    // Send email to user with instructions on how to reset password
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>שכחתי סיסמה</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <Button
 
title="Submit"
 
onPress={handleSubmit} />

    
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '60%',
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    width: '100%',
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
});

export default ForgotPassword;