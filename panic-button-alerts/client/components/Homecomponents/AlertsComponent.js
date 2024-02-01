import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, Image, TouchableOpacity, Text, View, Dimensions, Alert, FlatList } from 'react-native';
import axios from '../../services/axiosInstance';
import { Icon } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import CustomButton from '../../services/CustomButton'
import { useTranslation } from 'react-i18next';
export default function Alertscomp({ onIdchange, onAlertchange, propId }) {
    const { t, i18n } = useTranslation();
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
    const [AllList, setAllList] = useState([...ListHigh, ...ListMedium, ...ListLow])
    const isSmallDevice = Dimensions.get('window').width < 768
    const colorHi = {
        backgroundImage: 'linear-gradient(220deg, rgb(255, 0, 0), rgb(255, 255, 255))'
    };
    const colorMed = {
        backgroundImage: 'linear-gradient(220deg, rgb(253 95 6 / 99%), rgb(255, 255, 255))'
    };
    const colorLow = {
        backgroundImage: 'linear-gradient(220deg, rgb(41 225 25 / 98%), rgb(255, 255, 255))'
    };

    useEffect(() => {
        if (lastIdAlert) {
            setAllList([...ListHigh, ...ListMedium, ...ListLow])
            setState([...ListHigh, ...ListMedium, ...ListLow])
            const interval = setInterval(() => {
                {
                    flag ? (setAllList([...ListHigh, ...ListMedium, ...ListLow]),
                        setState([...ListHigh, ...ListMedium, ...ListLow]),
                        setflag(false)) : null
                }
                { propId ? setoccupied({ ...occupied, flag: true, Id: propId }) : setoccupied({ ...occupied, flag: false, Id: null }) }
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
    async function handleAlertPress(value, state) {
        if (state == "in treatment") {
            onIdchange(value, "in treatment")
        }
        else {
            onIdchange(value, 'for treatment')
            try {
                const response = await axios.post(`alerts/`, { id: value, status: "in treatment" },);
                const result = response.data
            } catch (error) {
                console.log(error);
            }
        }
        setoccupied({ ...occupied, flag: true, Id: value })
    }
    return (
        <View style={styles.container}>
            {isSmallDevice || <View style={styles.buttons}>
            <CustomButton labal={t(`High${ListHigh.length}`)} onPress={() => { changeState("High") }}/>
                <CustomButton labal={"Medium"}  onPress={() => { changeState("Med") }}
                />
                <CustomButton labal={"Low"}  onPress={() => { changeState("Low") }}
                />
                <CustomButton labal={t(`All${AllList.length}`)}  onPress={() => { changeState("All") }}
                >
                </CustomButton>
            </View>}
            {State != [] ?
                <View style={styles.containerCalls}>
                    <ScrollView vertical={true} style={styles.scrollview}>
                       
                      
                        {State.map((call, index) => {
                            return (
                                <View key={call._id}>
                                    {(isSmallDevice && occupied.flag) ?
                                        <View style={styles.ListIcon} >
                                            <AntDesign name="exclamationcircle" size={24} color={call.level == "Hard" ? "red" :
                                                call.level == "Medium" ? "orange" : "green"} padding={50}
                                                onPress={() => { { occupied.flag || handleAlertPress(call._id) } }} />
                                        </View> : <TouchableOpacity
                                            // disabled={call.status === "in treatment" ? true : false}
                                            style={[
                                                (call.status == "in treatment" ?
                                                    [styles.alert, styles.inTreatment] : styles.alert),
                                                call.level == "Hard" ? colorHi :
                                                    call.level == "Medium" ? colorMed : colorLow]}
                                            onPress={() => { !occupied.flag ? handleAlertPress(call._id, call.status) : alert(" you need to close to changing to a difrent one") }} >
                                            <Text style={styles.text}>{call.status}</Text>
                                            <Text style={styles.text}>{call.distressDescription}</Text>
                                            <Text style={styles.text}>{`${call.date.split('T')[1].split('.')[0]}`} </Text>
                                        </TouchableOpacity>}
                                </View>)
                        })}
                    </ScrollView>
                </View> : <Text>"No distress alerts"</Text>}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {

        height: '100%',
        width: '100%'
    },
    containerCalls: {
        display: "flex",
        alignContent: "center",
        alignItems: "center"
    },
    alert: {
        // width: '50%', // Adjust the width to fit two alerts in a row
        height: 80, // Adjust the height as needed
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

    buttons: {
        flexDirection: 'row', // סדר כפתורים בשורה
        justifyContent: 'space-between', // הפצל את הכפתורים באופן שווה
        marginTop: 20, // הוסף רווח עליון
        marginBottom: 20, // הוסף רווח תחתון לפני הכרטיסיות
        paddingHorizontal: 10, // הקטן את הרווח האופקי בקצוות
    },
    button: {
        height: 40, // גובה הכפתור
        paddingHorizontal: 15, // רווח אופקי פנימי
        borderRadius: 10, // קירות עגולות
        backgroundColor: 'rgb(197, 141, 163)',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 2, // הקטן את הרווח בין הכפתורים
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    textb: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },

    ListIcon: {
        alignItems: 'flex-start',
        justifyFontent: 'space-around'
    },
    scrollview:{
        flex: 1,
    maxHeight: "30%",
},
});