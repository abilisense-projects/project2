import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, TouchableOpacity, Text, View, } from 'react-native';
import SpecificCall from "./Specificallcomp";
import axios from '../../services/axiosInstance';
export default function Alertscomp() {

    const [ListLow, setListLow] = useState([])
    const [ListMedium, setListMedium] = useState([])
    const [ListHigh, setListHigh] = useState([])
    const [ListAlertsAvailability, setListAlertsAvailability] = useState([])
    const [ListAlertsUrgency, setListAlertsUrgency] = useState([])
    const [State, setState] = useState([])
    const [lastIdAlert, setlastIdAlert] = useState(null)

    const screen =()=>{
         setState([...ListHigh, ...ListMedium, ...ListLow])
    }
    const colorHi = {
        backgroundImage: 'linear-gradient(220deg, rgb(255, 0, 0), rgb(255, 255, 255))'
    };
    const colorMed = {
        backgroundImage: 'linear-gradient(220deg, rgb(253 95 6 / 99%), rgb(255, 255, 255))'
    };
    const colorLow = {
        backgroundImage: 'linear-gradient(220deg, rgb(206 255 0 / 98%), rgb(255, 255, 255))'
    };

    useEffect(() => {
        if (lastIdAlert) {
            const interval = setInterval(() => {
                getnewAlert();
            }, 1000);
            return () => clearInterval(interval);
        }
        getListAlerts();
        setState([...ListHigh, ...ListMedium, ...ListLow])
        screen();
    }, [lastIdAlert]);

    async function getListAlerts() {
        try {
            const response = await axios.get('alerts');
            const result = response.data
            setlastIdAlert(result[(result.length - 1)]._id)
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
                setListAlertsAvailability(current => [element, ...current])
            }
            setState([...ListHigh, ...ListMedium, ...ListLow])
        } catch (error) {
            console.log(error)
        }
    }
    async function getnewAlert() {
        if (lastIdAlert) {
            try {
                const response = await axios.get(`alerts/${lastIdAlert}`,);
                const result = response.data
                if (result.isUpdate) {
                    setlastIdAlert(result[(result.length - 1)]._id)
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
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    function changeState(params) {
        if (params === "High") {
            setState([])
            setState([...ListHigh])
        }
        else if (params === "Med") {
            setState([])
            setState([...ListMedium])
        }
        else if (params === "Low") {
            setState([])
            setState([...ListLow])
        }
        else {
            setState([])
            setState([...ListHigh, ...ListMedium, ...ListLow])
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={() => { setState([]), changeState("High") }}
                ><Text style={styles.textb}>High</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => { setState([]), changeState("Med") }}
                ><Text style={styles.textb}>Med</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => { setState([]), changeState("Low") }}
                ><Text style={styles.textb}>Low</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => { setState([]), changeState("All") }}
                ><Text style={styles.textb}>All</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.containerCalls}>
                {State && State.map((call, index) => {
                    return (
                        <TouchableOpacity
                            key={call._id}
                            style={[
                                styles.alert,
                                call.level == "Hard" ? colorHi :
                                    call.level == "Medium" ? colorMed : colorLow
                            ]}
                            onPress={() => <SpecificCall />}
                        >
                            {call.level == "Hard" ? <Image style={styles.img}
                                source={{ uri: '/static/media/hi.b2fd8eed21094cc1e0ef.png' }} /> :
                                call.level == "Medium" ? <Image style={styles.img}
                                    source={{ uri: '/static/media/med.645af0b7b0645b787cb8.png' }} /> :
                                    <Image style={styles.img}
                                        source={{ uri: '/static/media/low.64f1b00574697900140a.png' }} />}
                            <Text style={styles.text}>{call.date}</Text>
                            {/* <Text style={styles.text}>{call.location}</Text> */}
                            <Text style={styles.text}>{call.distressDescription}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        flex: 1, // Add flex: 1 to make the container take the entire screen height
        alignItems: 'center', // Center items horizontally
    },
    containerCalls: {
        width: '50%', // Make the alerts container take the entire width
        paddingHorizontal: 20, // Add horizontal padding
        display: "flex",
        // Allow the container to take the remaining space
        justifyContent: 'space-around', // Distribute alerts evenly
        flexDirection: 'row', // Arrange alerts in a row
        flexWrap: 'wrap', // Wrap to the next row if needed
    },
    alert: {
        width: '100%', // Adjust the width to fit two alerts in a row
        height: 100, // Adjust the height as needed
        marginBottom: 20, // Add bottom margin between alerts
        borderRadius: 10, // Add border radius for a rounded look
        overflow: 'hidden', // Hide any overflow content
    },
    text: {
        color: 'black',
        textAlign: 'center', // Center text within each alert
        marginVertical: 5, // Add vertical margin to separate text lines
    },
    // img: {
    //     width: '100%',
    //     height: '60%', // Adjust the image height as needed
    //     resizeMode: 'cover', // Maintain aspect ratio while covering the container
    // },
    buttons: {
        flexDirection: 'row', // Arrange buttons in a row
        justifyContent: 'space-around', // Space buttons evenly
        marginTop: 20, // Add top margin to separate buttons from alerts
    },
    button: {
        height: 30,
        width: 70,
        borderRadius: 4,
        backgroundColor: 'black',
        justifyContent: 'center', // Center text within the button
        alignItems: 'center', // Center button within its container
    },
    textb: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});