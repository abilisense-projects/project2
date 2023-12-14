import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, TouchableOpacity, Text, View, Button, } from 'react-native';
import axios from '../../services/axiosInstance';
export default function Callscomp() {
    useEffect(() => {
        getListCalls();
    }, []);
    // {List:[],flag:false}
    const [ListLow, setListLow] = useState([])
    const [ListMedium, setListMedium] = useState([])
    const [ListHigh, setListHigh] = useState([])
    const [State,setState]=useState(ListCalls)
    const ListCalls = [...ListHigh.List, ...ListMedium.List, ...ListLow.List]

    const colorHi = {
        backgroundImage: 'linear-gradient(220deg, rgb(255, 0, 0), rgb(255, 255, 255))'
    };
    const colorMed = {
        backgroundImage: 'linear-gradient(220deg, rgb(253 95 6 / 99%), rgb(255, 255, 255))'
    };
    const colorLow = {
        backgroundImage: 'linear-gradient(220deg, rgb(206 255 0 / 98%), rgb(255, 255, 255))'
    };

    async function getListCalls() {


        try {
            // Send a request to the server to initiate the password reset process
            const response = await axios.get('/alert');
            const result=response.data
            if (result.status == "high") {
                // ListHigh.List(
                setListHigh(current => [result, ...current])
            }
            else if (result.status == "medium") {

                setListMedium(current => [result, ...current])
            }
            else {

                setListLow(current => [result, ...current])
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <View >
            <Text>קריאות</Text>
            {State.map((call, index) => {
                return (
                    <TouchableOpacity

                        key={call.id}
                        style={[styles.containerCalls, call.status == "high" ? colorHi :
                            call.status == "medium" ? colorMed : colorLow]}
                    // onPress={() => navigation.navigate("SpecificCall")}
                    >
                        {call.status == "high" ? <Image style={styles.img}
                            source={{ uri: '/static/media/hi.b2fd8eed21094cc1e0ef.png' }} /> :
                            call.status == "medium" ? <Image style={styles.img}
                                source={{ uri: '/static/media/med.645af0b7b0645b787cb8.png' }} /> :
                                <Image style={styles.img}
                                    source={{ uri: '/static/media/low.64f1b00574697900140a.png' }} />}
                        <Text
                            style={styles.text}
                        >
                            {call.date_time}
                        </Text>
                        <Text
                            style={styles.text}
                        >
                            {call.explaincall}
                        </Text>
                    </TouchableOpacity>
                )
            })}
            <Button onPress={() => setState(ListHigh)}>High</Button>
            <Button  onPress={() => setState(ListMedium)}>Medium</Button>
            <Button  onPress={() => setState(ListLow)}>Low</Button>
            <Button onPress={() => setState(ListCalls)}>All</Button>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        marginTop: 30
    },
    containerCalls: {
        padding: 20,
        marginTop: 10,
        width: '100px',
        height: '100px',
        alignItems: 'center',
        display: 'flex',
        justifyContent: ' space-between',
        flexDirection: 'row'

    },
    text: {
        decoration: 'underline',
        textAlign: 'center',
        color: 'black'
    },
    img:
    {
        width: 100,
        height: 100
    }
});