import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from "react-native";
import Alertscomp from '../components/alertcomps/Alerts';
import Specificall from '../components/Specificallcomp';
import MapComponent from '../components/MapComponent';
export default function Homepage() {
    useEffect(() => {
        updatemes();
    }, []);
    const [Mes, setMes] = useState(" ")
    const [Name, setName] = useState("Malka")
    const [Id, setId] = useState(null)
    async function updatemes() {
        const time = new Date();
        const hour = time.getHours()
        if (hour < 13) {
            setMes("Good morning!")
        }
        else if (hour < 18) {
            setMes("Good after noon");
        }
        else {
            setMes("Good night");
        }
    }
    function updateId(value) {
        setId(value)
    }
return (
    <View>
        <Text>{Mes} {Name}</Text>
        <View style={styles.container}>
        <Alertscomp   onvaluechange={updateId}/>
        < MapComponent />
        { Id &&<Specificall/>}</View>
        <StatusBar style="auto" />
    </View>
);
}
const styles = StyleSheet.create({
  
    container: {
        display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "space-around",
    justifyContent: "center",
    alignItems: "center"
    },
    text: {
        fontSize: 'large',
        color: 'black'
    },
})



