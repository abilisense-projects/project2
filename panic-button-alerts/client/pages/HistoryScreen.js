// MainScreen.js

import React, { useEffect, useState } from "react";
import { FlatList, View, Text, StyleSheet, Pressable } from "react-native";
import axios from "../services/axiosInstance";
import AlertCard from "../components/AlertCard";
import { decodeToken } from "../services/JwtService";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";
import Container from "../components/cors/ContainerPage";
import Loader from "../components/cors/Loader";

export default function Historypage() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();

  useEffect(() => {
    // Fetch data from the server
    const fetchData = async () => {
      try {
        const token = await decodeToken();
        const response = await axios.get(`history/user/${token._id}`);
        console.log(response.data);
        setAlerts(response.data);
        console.log(alerts.length > 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that this effect runs only once when the component mounts

  if (loading) {
    return (
      <Loader loading={loading}/>
      );
  }
  if (alerts.length !== 0) {
    return (
      <Container>
        <FlatList
          data={alerts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <AlertCard alert={item} />}
        />
      </Container>
    );
  } else {
    return (
      <Container>
        <Text style={{ color: colors.text }}>
          {t("you did not help yet 😒...")}
        </Text>
      </Container>
    );
  }
}
