import React from 'react';
import { Pressable, Text } from 'react-native';

export default function CustomButton({ label, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        // backgroundColor: '#AD40AF',
        padding: 20,
        marginBottom: 30,
        borderWidth: 2,
        borderColor: '#7C1C72',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 16,
          // color: '#fff',
        }}>
        {label}
      </Text>
    </Pressable>
  );
}
