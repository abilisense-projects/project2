import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, TouchableOpacity, Text, View, Dimensions, Alert } from 'react-native';
import axios from '../../services/axiosInstance';
import MyModal from "../Modal";
import { Icon } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
export default function Alertscomp({ onIdchange, onAlertchange }) {
    //   const icons = [
    //     { name: 'heart', type: 'font-awesome' },
    //     { name: 'star', type: 'material' },
    //     { name: 'rocket', type: 'octicon' },
    //     // Add more icons as needed
    //   ];
    const [ListLow, setListLow] = useState([])
    const [ListMedium, setListMedium] = useState([])
    const [ListHigh, setListHigh] = useState([])
    const [ListAlertsAvailability, setListAlertsAvailability] = useState([])
    const [ListAlertsUrgency, setListAlertsUrgency] = useState([])
    const [State, setState] = useState([])
    const [lastIdAlert, setlastIdAlert] = useState(null)
    const [lastIdUPdateAlert, setlastIdUPdateAlert] = useState(null)
    const [occupied, setoccupied] = useState({ flag: false, Id: null })
    const [chosenAlert, setchosenAlert] = useState("")
    const [flag, setflag] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [AllList, setAllList] = useState([...ListHigh, ...ListMedium, ...ListLow])
    const isSmallDevice = Dimensions.get('window').width < 768
    console.log((isSmallDevice && occupied.flag))
    const showModal = () => {
        setModalVisible(true);
    };
    const hideModal = () => {
        setModalVisible(false);
    };
    const handleIconClick = (iconName) => {
        Alert.alert(`Clicked on ${iconName}`);
    };

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
            setAllList([...ListHigh, ...ListMedium, ...ListLow]),
                setState([...ListHigh, ...ListMedium, ...ListLow])
            const interval = setInterval(() => {
                {
                    flag && setAllList([...ListHigh, ...ListMedium, ...ListLow]),
                        setState([...ListHigh, ...ListMedium, ...ListLow]),
                        setflag(false)
                }
                getnewAlert();
            }, 1000);
            return () => clearInterval(interval);
        }
        getListAlerts();

    }, [lastIdAlert]);

    async function getListAlerts() {
        try {
            console.log("enter")
            const response = await axios.get('http://localhost:8120/api/alerts');
            const result = response.data
            {
                result &&
                    onAlertchange({ status: "created", arr: result })
                setlastIdAlert(result[(result.length - 1)]._id)
                setlastIdUPdateAlert(result[(result.length - 1)]._id)
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
            }
        } catch (error) {
            console.log(error)
        }
    }
    async function getnewAlert() {
        if (lastIdAlert) {
            try {
                const response = await axios.get(`alerts/${lastIdAlert}`,);
                const result = response.data

                //new
                if (result.isNew) {
                    onAlertchange({ status: "add", arr: result })
                    setlastIdAlert(result.newAlerts[(result.newAlerts.length - 1)]._id)
                    for (let index = 0; index < result.newAlerts.length; index++) {
                        const element = result.newAlerts[index];
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
                    setflag(true)
                }
                //update
                else if (result.isUpdate) {
                    console.log("AllList0" + AllList)
                    let index = 0;
                    let j = 0, i = 0;
                    setlastIdUPdateAlert(result.updateAlerts[(result.updateAlerts.length - 1)]._id)
                    for (; i < result.updateAlerts.length; i++) {
                        const element = result.updateAlerts[i];
                        let tmparr = []
                        element.level === "Hard" ? tmparr = ListHigh : element.level === "Medium" ? tmparr = ListMedium : tmparr = ListLow
                        for (; j < tmparr.length; j++) {
                            if (tmparr[j]._id === element._id) {

                                if (element.status == "not treated" || element.status == "in treatment") {
                                    tmparr[j].update = element.update
                                    tmparr[j].status = element.status
                                } else {
                                    delete tmparr[j]
                                }
                            }
                        }
                        element.level === "Hard" ? setListHigh(tmparr) : element.level === "Medium" ? setListMedium(tmparr) : setListLow(tmparr)
                        setflag(true)
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    function changeState(params) {
        if (params === "High") {

            setState([...ListHigh])
        }
        else if (params === "Med") {

            setState([...ListMedium])
        }
        else if (params === "Low") {

            setState([...ListLow])
        }
        else {

            setState([...AllList])
        }
    }
    function handleAlertPress(value) {
        if (occupied.flag) {
            setchosenAlert(value)
            showModal()
        }
        else {
            onIdchange(value)
            setoccupied({ ...occupied, flag: true, Id: value })
            updateAlert(value, "in treatment")
        }
    }
    function handleLeaveAlert() {
        updateAlert(occupied.Id, "not treated")
        updateAlert(chosenAlert, "in treatment")
        onIdchange(chosenAlert)
    }
    async function updateAlert(IdAlert, msgState) {
        try {

            const response = await axios.post(`alerts/`, { id: IdAlert, status: msgState },);
            const result = response.data

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <View style={styles.container}>
           {isSmallDevice|| <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={() => { changeState("High") }}
                ><Text style={styles.textb}>High</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => { changeState("Med") }}
                ><Text style={styles.textb}>Med</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => { changeState("Low") }}
                ><Text style={styles.textb}>Low</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => { changeState("All") }}
                ><Text style={styles.textb}>All</Text>
                </TouchableOpacity>
            </View>}
            <View style={styles.containerCalls}>
                {State.map((call, index) => {

                    return (
<View  key={call._id}>
                       { (isSmallDevice && occupied.flag) ?
                            <View  style={styles.ListIcon} >
                                <AntDesign name="exclamationcircleo" size={24} color={call.level == "Hard" ? "red" :
                                        call.level == "Medium" ? "orange" : "yellow"} />
                            </View>

                            : <TouchableOpacity
                               

                                disabled={call.status === "in treatment" ? true : false}
                                style={[
                                    (call.status == "in treatment" ?
                                        [styles.alert, styles.inTreatment] : styles.alert),
                                    call.level == "Hard" ? colorHi :
                                        call.level == "Medium" ? colorMed : colorLow
                                ]}
                                onPress={() => { handleAlertPress(call._id) }}
                            >
                                {/* {call.level == "Hard" ? <Image style={styles.img}
                                source={{ uri: '/static/media/hi.b2fd8eed21094cc1e0ef.png' }} /> :
                                call.level == "Medium" ? <Image style={styles.img}
                                    source={{ uri: '/static/media/med.645af0b7b0645b787cb8.png' }} /> :
                                    <Image style={styles.img}
                                        source={{ uri: '/static/media/low.64f1b00574697900140a.png' }} />} */}

                                {(call._id === occupied.Id) ?
                                    <Text style={styles.text}>you care</Text> : <Text style={styles.text}>{call.status}</Text>}
                                {/* <Text style={styles.text}>{call.location}</Text> */}

                                <Text style={styles.text}>{call.distressDescription}</Text>
                                <Text style={styles.text}>{`${call.date.split('T')[1].split('.')[0]}  ${call.update.split('T')[1].split('.')[0]}`} </Text>

                                {/* <Text style={styles.text}>{call.update.split('T')[1].split('.')[0]}</Text> */}
                            </TouchableOpacity>}

                   </View> )
                }) || <Text>"No distress alerts"</Text>}
            </View>
            <MyModal
                text={"Are you sure you want to leave?"}
                visible={modalVisible}
                onConfirm={() => {

                    handleLeaveAlert()
                    hideModal()
                }}
                onCancel={hideModal}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      //  marginTop: 30,
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
        display: "flex",
        flexDirection: "row-reverse",
        flexWrap: "wrap",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: 'black',
        textAlign: 'center', // Center text within each alert
        marginVertical: 5,// Add vertical margin to separate text lines
        padding: "2%"
    },
    inTreatment: {
        borderWidth: "medium",
        opacity: '40%'
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
    ListIcon: {
        alignItems: 'flex-start',
        justifyFontent: 'space-around'
    }
});