import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from '../../services/axiosInstance';
import { useRoute } from '@react-navigation/native';
import CustomButton from '../../services/CustomButton';
import ValidatePassword from '../../services/ValidatePassword';

const ResetPassword = ({ route }) => {
  //const route = useRoute();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const [tokenVerified, setTokenVerified] = useState(false);
  const [isResetSuccess, setIsResetSuccess] = useState(false);
  const [resetToken, setResetToken] = useState('');
  const [validationResults, setValidationResults] = useState({
    length: false,
    number: false,
    specialChar: false,
    match: false,
  });

  useEffect(() => {
    const verify = async () => {
      const token = route.params?.resetToken;
      console.log('Reset Password Token:', token);

      if (token) {
        setResetToken(token);
        setTokenVerified(await verifyToken(token));
        navigation.navigate('password-reset', { email, resetToken })
      } else {
        setTokenVerified(false);
        setMessage("token not valid")
      }
    };
    verify();
  }, [route]);

  const handleResetPassword = async () => {
    setMessage(null);
    console.warn(validationResults)
    if (!(validationResults.length&validationResults.number&validationResults.specialChar&validationResults.match)) {
      return;
    }
    

    try {
      const response = await axios.post('/reset-password/reset', {
        email: route.params.email,
        token: route.params.token,
        password,
      });

      if (response.data.success) {
        setMessage('Password reset successful. You can now log in with your new password.');
        setIsResetSuccess(true);
      } else {
        setMessage('Something went wrong. Please try again later.');
      }
    } catch (error) {
      console.error('Error resetting password:', error.message);
      setMessage('An error occurred while resetting the password,check password again...');
    }
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
    setValidationResults(ValidatePassword(password, confirmPassword))
  };
  
  const handleConfirmPasswordChange = (confirmPassword) => {
    setConfirmPassword(confirmPassword);
    setValidationResults(ValidatePassword(password, confirmPassword));
  };
  
  
  

  return (
    <View style={styles.container}>
      {route.params && <Text>Deep Link Params: {JSON.stringify(route.params)}</Text>} 
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter New Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={handlePasswordChange}
        />
        <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="black" />
        </TouchableOpacity>
      </View>
      {renderValidationItem('Minimum 8 characters', validationResults.length)}
      {renderValidationItem('At least 1 number', validationResults.number)}
      {renderValidationItem('At least 1 special character', validationResults.specialChar)}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          secureTextEntry={!showPassword}
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
        />
        <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="black" />
        </TouchableOpacity>
      </View>
      {renderValidationItem('Passwords match', validationResults.match)}
      <CustomButton label={"Reset Password"} onPress={handleResetPassword}  />

      {isResetSuccess && (
        <View>
          <Text>
            Reset successfully.{' '}
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{ color: 'blue' }}>Login</Text>
            </TouchableOpacity>
          </Text>
        </View>
      )}

      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const renderValidationItem = (text, isValid) => (
  <View style={styles.validationItem}>
    <Text style={{ color: isValid ? 'green' : 'red' }}>{isValid ? '✅' : '❌'}</Text>
    <Text style={{ marginLeft: 8 }}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 8,
  },
  eyeIcon: {
    padding: 8,
  },
  validationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  button: {
    marginTop: 12,
  },
  message: {
    marginTop: 12,
    color: 'red', // or any other color you prefer for error messages
  },
});

export default ResetPassword;
