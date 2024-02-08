//

// Example to Pick and Upload files in React Native
// https://aboutreact.com/file-uploading-in-react-native/

// Import React
import React, { useEffect, useState } from "react";
// Import core components
import { StyleSheet, Text, View, File, Pressable } from "react-native";
import AlertCard from '../AlertCard';
import axios from "../../services/axiosInstance";
const MoreDetailse = ({data}) => {
    useEffect(() => {getPreviousAlerts()})
    const [PreviousAlert, setPreviousAlert] = useState({ falseAlert: [], trueAlert: [] })
    const [PreviousAlertShow, setPreviousAlertShow] = useState({ falseAlert: false, trueAlert: false })
  async function getPreviousAlerts() {
    console.log(alertData);
    try {
      const response = await axios.get(`/history/patient/${propId}`);
      const result = response.data
      console.log("history/patient   "+result.length)
      const countFalse = [], countTrue = [];
      for (let index = 0; index < result.length; index++) {
        const element = result[index];
        if (element.status == "cancel") {
          countFalse.push(element)
        }
        else {
          countTrue.push(element)
        }
        setPreviousAlert({ ...PreviousAlert, falseAlert:countFalse })
        setPreviousAlert({ ...PreviousAlert, trueAlert:countTrue})
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <View style={styles.more}>
    <Text style={styles.dataSpecificAlertText}>   Diseases:{'\n'}</Text>

    {data.map((item, key) =>{ return ( <View key={item._id}>
      <Text style={{ color: 'white', fontSize: "150%", }} >{item}{'\n'}</Text></View>)}

    )}
    {/* <Text style={styles.dataSpecificAlertText}> Previous alerts:{'\n'}</Text>
    <TouchableOpacity onPress={() => setPreviousAlertShow({ ...PreviousAlertShow, falseAlert: false, trueAlert: true })}>
      <Text style={{ color: 'white', fontSize: "150%", }}>Previous alerts: {PreviousAlert.trueAlert.length}</Text></TouchableOpacity>
    <TouchableOpacity onPress={() => setPreviousAlertShow({ ...PreviousAlertShow, falseAlert: true, trueAlert: false })}>
      <Text style={{ color: 'white', fontSize: "150%", }}>Previous false alerts: {PreviousAlert.falseAlert.length}</Text></TouchableOpacity>
    {PreviousAlertShow.trueAlert && <FlatList
    data={PreviousAlert.trueAlert}
    keyExtractor={(item) => item._id}
    renderItem={({ item }) => <AlertCard alert={item} />}
  />}
    {PreviousAlertShow.falseAlert && <FlatList
    data={PreviousAlert.falseAlert}
    keyExtractor={(item) => item._id}
    renderItem={({ item }) => <AlertCard alert={item} />}
  />} */}
  </View>
  );
};

const styles = StyleSheet.create({
    dataSpecificAlertText: {
        color: '#FFF',
        fontSize:" 150%",
      },
      more: {
        backgroundColor: '#1F1F1F',
        borderRadius: 10,
        padding: 16,
      },
});

export default MoreDetailse;
