
import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, FlatList, Image, Text } from "react-native";
import { useRoute } from '@react-navigation/native';
import Alertscomp from '../components/alertcomps/Alerts';
import RegisterScreen from "./RegistrScreen";
export default function Homepage({ navigation }) {
    useEffect(() => {
        updatemes();

    }, []);
    // { route, navigation }
    // const { paramName } = route
    // navigation.navigate('RouteName', { /* params go here */ })
    const [Mes, setMes] = useState(" ")
    const [Name, setName] = useState("Malka")

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
    return (
        <View style={styles.container}>
            <Text>{Mes} {Name}</Text>
            <Alertscomp />
            {/* <Specificall /> */}
            
            <StatusBar style="auto" />
        </View>
    );
    const RegisterScreen = ({ navigation, route }) => {
        return <Text>This is {route.params.name}'s profile</Text>;
    };
}
const styles = StyleSheet.create({
    nav: {
        display: 'flex'
    },
    containerAllCalls: {
        left: '20%',
        height: '100px',
        width: '70px'
    },
    containerSpeCall: {
        right: '20%',
        height: '100px',
        width: '70px'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 'large',
        color: 'black'
    },
})


