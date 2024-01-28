import React from "react";
import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet } from "react-native";

const AlertCard = ({ alert }) => {
  const { t, i18n } = useTranslation();
  const {
    alertId: {
      date,
      distressDescription,
      status,
      location: {
        country,
        city,
        street,
        buildingNumber,
        floor,
        apartmentNumber,
      },
    },
    duration,
  } = alert;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>`$t(Alert Details)`</Text>
      <Text style={styles.subtitle}>
        t(Date: ){new Date(date).toLocaleString()}
      </Text>
      <Text style={styles.subtitle}>
        t(Distress Description: ){distressDescription}
      </Text>
      <Text style={styles.subtitle}>t(Status: ){status}</Text>
      <Text style={styles.subtitle}>
        t(Location: )
        {`${buildingNumber}, ${street}, Floor ${floor}, Apt ${apartmentNumber}, ${city}, ${country}`}
      </Text>
      <Text style={styles.subtitle}>t(Duration: ){duration}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 3,
  },
});

export default AlertCard;
