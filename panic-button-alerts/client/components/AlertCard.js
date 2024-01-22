import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AlertCard = ({ alert }) => {
  const {
    alertId: {
      date,
      distressDescription,
      status,
      location: { country, city, street, buildingNumber, floor, apartmentNumber },
    },
    duration,
  } = alert;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Alert Details</Text>
      <Text style={styles.subtitle}>Date: {new Date(date).toLocaleString()}</Text>
      <Text style={styles.subtitle}>Distress Description: {distressDescription}</Text>
      <Text style={styles.subtitle}>Status: {status}</Text>
      <Text style={styles.subtitle}>Location: {`${buildingNumber}, ${street}, Floor ${floor}, Apt ${apartmentNumber}, ${city}, ${country}`}</Text>
      <Text style={styles.subtitle}>Duration: {duration}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
});

export default AlertCard;

