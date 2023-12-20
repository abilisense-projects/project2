
import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, FlatList, Image, Text } from "react-native";
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
        const time = new Date();


        const hour = time.getHours()
        if (hour < 13) {
            setMes("Good morning!")
        }
        else if (hour < 18) {
            return "Good after noon";

        const hour = time.getHours()
        if (hour < 13) {
            setMes("Good morning!")
        }
        else if (hour < 18) {
            return "Good after noon";
        }
        else if (hour < 23) {
            return "Good evening";
        else if (hour < 23) {
            return "Good evening";
        }
        else {
            return "Good night";

        }
    }
            return "Good night";

        }
    }
    return (
        <View style={styles.container}>
            <Text>{Mes} {Name}</Text>
            <Alertscomp />
            {/* <Specificall /> */}
            <Button
      title="Go to Jane's profile"
      onPress={() =>
        navigation.navigate('register', {name: 'Jane'})
      }
    />
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


