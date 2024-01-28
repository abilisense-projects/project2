// MainScreen.js

import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import axios from '../services/axiosInstance';
import AlertCard from '../components/AlertCard';
import { decodeToken } from '../services/JwtService';

const Historypage = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the server
    const fetchData = async () => {
      try {
        const token= await decodeToken()
        const response = await axios.get(`alerts/history/${token._id}`); // Replace with your actual server endpoint
        setAlerts(response.data);
        console.log(alerts)
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that this effect runs only once when the component mounts

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={alerts}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <AlertCard alert={item} />}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Historypage;
