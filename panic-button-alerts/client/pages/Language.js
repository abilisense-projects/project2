import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    // You can add logic here to change the app's language based on the selection
  };

  return (
    <View style={{ alignItems: 'center', marginTop: 20 }}>
      <FontAwesomeIcon icon={faLanguage} size={50} color="black" style={{ marginBottom: 10 }} />
      <Text>Select Language:</Text>
      {/* Your Picker component here */}
    </View>
  );
};

export default LanguageSelector;
