import { useTheme } from '@react-navigation/native';
import React, { useState, useRef } from 'react';
import { Pressable, Text, Animated, Platform } from 'react-native';

export default function CustomButton({ label, onPress }) {
  const [isHovered, setIsHovered] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const { colors } = useTheme();

  const handlePressIn = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FFFFFF', '#E33458'], // Start from white to red
  });

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={({ pressed }) => [
        {
          width:"75%",
          height:40,
          padding: 8,
          marginTop:20,
          marginBottom: 30,
          borderWidth: 2,
          borderColor: '#E33458',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          backgroundColor: pressed || isHovered ? '#E33458' : colors.buttonBackground, // Change color on press or hover
        },
        Platform.OS === 'web' && {
          cursor: 'pointer',
          userSelect: 'none',
        },
      ]}
      onMouseEnter={() => Platform.OS === 'web' && setIsHovered(true)}
      onMouseLeave={() => Platform.OS === 'web' && setIsHovered(false)}
    >
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 16,
          color: isHovered || Platform.OS !== 'web' ? colors.background : colors.text, // Text color changes on hover or if not web
        }}>
        {label}
      </Text>
    </Pressable>
  );
}
