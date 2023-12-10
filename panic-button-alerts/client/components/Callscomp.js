import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, TouchableOpacity, Text, View, } from 'react-native';

export default function Callscomp() {
    useEffect(() => {
        getListCalls(tempobjeckt);
    }, []);
    const [ListLow, setListLow] = useState([])
    const [ListMedium, setListMedium] = useState([])
    const [ListHigh, setListHigh] = useState([])
    const ListCalls = [...ListHigh, ...ListMedium, ...ListLow]

function getListCalls() {
    if (tempobjeckt.status == "high") {

        setListHigh(current => [tempobjeckt, ...current])
    }
    else if (tempobjeckt.status == "medium") {

        setListMedium(current => [tempobjeckt, ...current])
    }
    else {

        setListLow(current => [tempobjeckt, ...current])
    }
    // Option if I get an array of readings
    // function RemainingTime(t2) {
    //     const t1 = new Date().getTime();
    //     let ts = (t1 - t2.getTime()) / 1000;

    //     var d = Math.floor(ts / (3600 * 24));
    //     var h = Math.floor(ts % (3600 * 24) / 3600);
    //     var m = Math.floor(ts % 3600 / 60);
    //     var s = Math.floor(ts % 60);

    //     console.log(d, h, m, s)

    // }
    // const newtemparr = temparr.sort((a, b) =>
    //     temparSort(a, b) ? -1 : 1)
    // function temparSort(a, b) {
    //     if ((a.status == "high" && b.status == "high") ||
    //         (a.status == "medium" && b.status == "medium") ||
    //         (a.status == "low" && b.status == "low"))
    //         if (RemainingTime(new Date(a.date_time)) < RemainingTime(new Date(b.date_time))) {
    //             console.log(newtemparr)
    //             return true
    //         }
    //         else {
    //             console.log(newtemparr)
    //             return false
    //         }
    //     if (a.status == "high" || b.status == "low") {
    //         console.log(newtemparr)
    //         return true
    //     }
    //     else {
    //         console.log(newtemparr)
    //         return false
    //     }
    // }

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
return (
    <View >
        <Text>קריאות</Text>
        {ListCalls.map((call, index) => {
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