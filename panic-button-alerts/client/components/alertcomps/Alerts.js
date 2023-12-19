import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, TouchableOpacity, Text, View, Pressable, } from 'react-native';
import axios from '../../services/axiosInstance';
import Btns from './Btns';

// import myimg from "../assets/images/";
export default function Alertscomp() {
    useEffect(() => {
        getListAlerts();
        // const interval = setInterval(() => {
        //     getnewAlert();
        // }, 1000);
        return () => clearInterval(interval);
    }, []);
    
    const [ListLow, setListLow] = useState([])
    const [ListMedium, setListMedium] = useState([])
    const [ListHigh, setListHigh] = useState([])
    const [State, setState] = useState([])
    const [lastAlert, setlastAlert] = useState({})
    const ListCalls = [...ListHigh, ...ListMedium, ...ListLow]

    const colorHi = {
        backgroundImage: 'linear-gradient(220deg, rgb(255, 0, 0), rgb(255, 255, 255))'
    };
    const colorMed = {
        backgroundImage: 'linear-gradient(220deg, rgb(253 95 6 / 99%), rgb(255, 255, 255))'
    };
    const colorLow = {
        backgroundImage: 'linear-gradient(220deg, rgb(206 255 0 / 98%), rgb(255, 255, 255))'
    };
    


    async function getListAlerts() {
        try {

            const response = await axios.get('alerts');
            const result = response.data
            for (let index = 0; index < result.length; index++) {
                const element = result[index];


                if (element.level == "Hard") {
                    
                    setListHigh(current => [element, ...current])
                }
                else if (element.level == "Medium") {

                    setListMedium(current => [element, ...current])
                }
                else {

                    setListLow(current => [element, ...current])
                } 
                setState(ListCalls)
                setlastAlert(result[(result.length-1)])
            }
        } catch (error) {
            console.log(error)
        }
    }


    async function getnewAlert(){
        try {

            const response = await axios.get('alerts/',{lastAlert});
            const result = response.data
            for (let index = 0; index < result.length; index++) {
                const element = result[index];


                if (element.level == "Hard") {
                    // ListHigh.List(
                    setListHigh(current => [element, ...current])
                }
                else if (element.level == "Medium") {

                    setListMedium(current => [element, ...current])
                }
                else {

                    setListLow(current => [element, ...current])
                } 

            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <View >
            <Text>קריאות</Text>
            <Btns/>
            <View style={styles.containerCalls}>
                {State == null ? console.log(State) : console.log(State)}
                {ListCalls.map((call, index) => {
                    return (
                        <TouchableOpacity

                            key={call._id}
                            style={[ styles.alert, call.level == "Hard" ? colorHi :
                                call.level == "Medium" ? colorMed : colorLow]}
                        // onPress={() => navigation.navigate("SpecificCall")}
                        >
                            {call.level == "Hard" ? <Image style={styles.img}
                                source={{ uri: '/static/media/hi.b2fd8eed21094cc1e0ef.png' }} /> :
                                call.level == "Medium" ? <Image style={styles.img}
                                    source={{ uri: '/static/media/med.645af0b7b0645b787cb8.png' }} /> :
                                    <Image style={styles.img}
                                        source={{ uri: '/static/media/low.64f1b00574697900140a.png' }} />}
                            <Text
                                style={styles.text}
                            >
                                {call.date}
                            </Text>
                            <Text
                                style={styles.text}
                            >
                                {call.location}
                            </Text>
                            <Text
                                style={styles.text}
                            >
                                {call.distressDescription}
                            </Text>
                        </TouchableOpacity>
                    )
                })}</View>
            
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        marginTop: 30
    },
    containerCalls: {
        // padding: 20,
        // marginTop: 10,
        // width: '50%',
        // height: '20%',
        // alignItems: 'center',
        // display: 'flex',
        // justifyContent: ' space-between',
        // flexDirection: 'row'

    },
    alert:{
        width: "150%",
        
        height: '15%',
        transitionDuration: '0s',
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    text: {
        // decoration: 'underline',
       
        color: 'black'
    },
    img:
    {
        width: 100,
        height: 100
    },
    button: {
         height: '30px',
         width: '70px',
        // paddingVertical: 12,
        // paddingHorizontal: 32,
         borderRadius: 4,
        // // elevation: 3,
         backgroundColor: 'black'
    },
    textb: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    buttons: {
display:'flex'
    }
});