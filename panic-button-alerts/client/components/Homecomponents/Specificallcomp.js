import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import axios from '../../services/axiosInstance';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome5, FontAwesome6, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import MyModal from "../Modal";
import TimerModal from './Time'
import UploadFiles from "./UploadFiles";
import SOSForm from './SummarizeAlert';
// run animation... (`runAfterInteractions` tasks are queued)
// later, on animation completion:
//InteractionManager.clearInteractionHandle(handle);
// queued tasks run if all handles were cleared
export default function Specificall({ propId, onIdchange, propStatus }) {
  useEffect(() => {
    getInfoAlerts()
    getPreviousAlerts()
  }, [propId]);
  const [data, setdata] = useState(null)
  const [PreviousAlert, setPreviousAlert] = useState({ falseAlert: [], trueAlert: [] })
  const [PreviousAlertShow, setPreviousAlertShow] = useState({ falseAlert: false, trueAlert: false })
  const [modalVisible, setModalVisible] = useState(false);
  const [moreDetails, setmoreDetails] = useState(false);
  const [dataSpecificAlert, setdataSpecificAlert] = useState({ flag: false, data: " " });
  const [alertData, setAlertData] = useState({
    dateAndTime: '',
    callerName: '',
    location: '',
    natureOfEmergency: '',
    callerContactNumber: '',
    description: '',
    severity: '',
    hazards: '',
    actionsTaken: '',
    additionalNotes: '',
    operatorName: '',
    operatorID: '',
    completionDateAndTime: '',
  });

  const showModal = () => {
    setModalVisible(true);
  };
  const hideModal = () => {
    setModalVisible(false);
  };

  async function getInfoAlerts() {
    try {
      const response = await axios.get(`/alerts/details/${propId}`);
      const result = response.data
      console.log(result)
      setdata(result)
    } catch (error) {
      console.log(error)
    }
  }
  async function getPreviousAlerts() {
    try {
      const response = await axios.get(`/history/pasient/${propId}`);
      const result = response
      console.log(result)
      const countFalse = 0, countTrue = 0;
      for (let index = 0; index < result.length; index++) {
        const element = array[index];
        if (element.status == "Cancele") {
          setPreviousAlert({ ...PreviousAlert, falseAlert: current => [element, ...current] })
        }
        else {
          setPreviousAlert({ ...PreviousAlert, trueAlert: current => [element, ...current] })
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  async function handleLeaveAlert() {
    try {
      const response = await axios.post(`alerts/`, { id: data.alert._id, status: "not treated" },);
      const result = response.data
      onIdchange(null)
    } catch (error) {
      console.log(error);
    }

  }
  async function updateAlert(IdAlert, msgState) {
    try {
      const response = await axios.post(`alerts/`, { id: IdAlert, status: msgState, summary: alertData });
      const result = response.data

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={styles.container}>

      {data ? <View>
        {propStatus == "not treated" &&
          < View style={{ top: "5%", height: "20px", width: '200px', right: "250px", zIndex: 5 }}>
            <Text style={styles.headerButtonText}> you care:</Text>
            <TimerModal isVisible={true} />
          </View >
        }
        <View style={styles.header}>
          <Text style={styles.headerText}>{data.alert.level}</Text>
          {propStatus == "not treated" ? <Text style={styles.headerButtonText}>Open</Text> :
            <Text style={styles.headerButtonText}>Close</Text>}
        </View>
        <TouchableOpacity style={styles.helpButton}>
          <Text style={styles.helpButtonText}>{data.alert.distressDescription}</Text>
        </TouchableOpacity>
        <View style={styles.dateTime}>
          <Text style={styles.dateText}>Date: {data.alert.date.split('T')[0]}</Text>
          <Text style={styles.timeText}>Time: {data.alert.date.split('T')[1].split('.')[0]}</Text>
        </View>
        <TouchableOpacity style={styles.audioButton}>
          <Ionicons name="play" size={24} color="white" />
          <Text style={styles.audioText}>Part :{data.alert.audio ? data.alert.audio : "Does not exist"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setmoreDetails(!moreDetails) }}>
          <Text style={styles.audioText}>More Details</Text>
        </TouchableOpacity>

        <View style={styles.menu}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.column}>
              <MaterialCommunityIcons name="map-marker-radius-outline" size={24} color="white" />
              <Text style={{ color: "white" }}>Map</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.column}
              onPress={() => setdataSpecificAlert({ ...dataSpecificAlert, flag: !dataSpecificAlert.flag, data: "Sensor" })}>
              <MaterialIcons name="sensors" size={24} color="white" />
              <Text style={{ color: "white" }}>Sensor</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={styles.column}
              onPress={() =>{propStatus != "for treatment" || setdataSpecificAlert({ ...dataSpecificAlert, flag: !dataSpecificAlert.flag, data: "Evidence" })}}>
              <FontAwesome5 name="magnifying-glass-chart" size={24} color="white" />
              <Text style={{ color: "white" }}>Evidence</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.column}
              onPress={() => setdataSpecificAlert({ ...dataSpecificAlert, flag: !dataSpecificAlert.flag, data: "Trigger" })}>
              <MaterialCommunityIcons name="alarm-light-outline" size={24} color="white" />
              <Text style={{ color: "white" }}>Trigger</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={styles.column}
              onPress={() => { setdataSpecificAlert({ ...dataSpecificAlert, flag: !dataSpecificAlert.flag, data: "Instructions" }) }}>
              <MaterialIcons name="linear-scale" size={24} color="white" />
              <Text style={{ color: "white" }}>Instructions</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.column}
              onPress={() => {propStatus != "for treatment" || setdataSpecificAlert({ ...dataSpecificAlert, flag: !dataSpecificAlert.flag, data: "Ticketing" }) }}>
              <FontAwesome5 name="clipboard-list" size={24} color="white" />
              <Text style={{ color: "white" }}>Ticketing</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footer}>
          {propStatus == "not treated" && <TouchableOpacity style={styles.footerButton}
            onPress={() => {
              {
                alertData.callerName != "" ? (updateAlert(data.alert._id, "treated"), onIdchange(null)) : alert("you need to make summry")
              }
            }}>
            <Ionicons name="checkmark" size={24} color="white" />
            <Text color="white">Applay</Text>
          </TouchableOpacity>}
          <TouchableOpacity style={styles.footerButton}
            onPress={() => { showModal(), setdataSpecificAlert({ ...dataSpecificAlert, flag: false, data: "" }) }}>
            <Ionicons name="close" size={24} color="white" />
            <Text color="white">Close</Text>
          </TouchableOpacity>
        </View>
      </View> : <Text style={styles.helpButtonText}>the server crashed</Text>}
      {dataSpecificAlert.flag &&
        <View style={dataSpecificAlert.data != "Ticketing" ? styles.dataSpecificAlert : {
          right: "165%",
          bottom: "20%",
          zIndex: 5,
          width: "140%",
          height: "400px",
          backgroundColor: 'white',
          borderRadius: 30,
          padding: "5%",
        }}>
          {dataSpecificAlert.data == "Sensor" ? <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
            <Text style={styles.dataSpecificAlertText}> Sensor name: {"none"}
              {'\n'}
              Status: {"none"}
              {'\n'}
              Type: {"none"}
              {'\n'}
            </Text>

            <Text style={styles.dataSpecificAlertText}> Adress:{data.alert.location.street}
              {'\n'}
              City: {data.alert.location.city}
              {'\n'}
              Country: {data.alert.location.country}
              {'\n'}</Text></View> :
            dataSpecificAlert.data == "Evidence" ? <UploadFiles /> :
              dataSpecificAlert.data == "Trigger" ? <Text style={styles.dataSpecificAlertText}>Type: Message</Text> :
                dataSpecificAlert.data == "Instructions" ? <Text style={styles.dataSpecificAlertText}>no further instruction</Text> :
                  dataSpecificAlert.data == "Ticketing" ? <SOSForm onDataAlert={setAlertData} /> : null
          }
        </View>}
      {moreDetails && <View style={styles.more}>
        <Text style={styles.dataSpecificAlertText}>   Diseases:{'\n'}</Text>

        {data.medicalConditions.map((item, key) => (
          <Text style={{ color: 'white', fontSize: 16, }} >{item}{'\n'}</Text>

        ))}
        <Text style={styles.dataSpecificAlertText}> {'\n'}{'\n'}  Previous alerts:{'\n'}</Text>
        <TouchableOpacity onPress={() => setPreviousAlertShow({ ...PreviousAlertShow, falseAlert: false, trueAlert: true })}>
          <Text style={{ color: 'white', fontSize: 16, }}>Previous alerts: {PreviousAlert.trueAlert.length}</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setPreviousAlertShow({ ...PreviousAlertShow, falseAlert: true, trueAlert: false })}>
          <Text style={{ color: 'white', fontSize: 16, }}>Previous false alerts: {PreviousAlert.falseAlert.length}</Text></TouchableOpacity>
        {PreviousAlertShow.trueAlert && PreviousAlert.trueAlert.map((item, key) => (
          <Text>{item._id}</Text>
        ))}
        {PreviousAlertShow.falseAlert && PreviousAlert.falseAlert.map((item, key) => (
          <Text>{item._id}</Text>
        ))}
      </View>}
      <MyModal
        text={"Are you sure you want to leave?"}
        visible={modalVisible}
        onConfirm={() => {
          {propStatus == "not treated" ?
          handleLeaveAlert(): onIdchange(null)}
          hideModal();
        }}
        onCancel={hideModal}
        action={"Sure"}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    borderRadius: 10,
    // padding: 20,
  },
  header: {
    justifyContent: " space-evenly",
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
  headerButton: {
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  headerButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
  helpButton: {
    textAlign: "center",
    backgroundColor: 'pink',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: "1%",
  },
  helpButtonText: {
    textAlign: "center",
    color: 'white',
    fontSize: 16,
  },
  dateTime: {
    marginBottom: "1%",
  },
  dateText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
  timeText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
  audioButton: {
    alignSelf: "center",
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  audioText: {

    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  menu: {
    flexDirection: 'column',
    alignItems: 'normal',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: '2%',
  },
  column: {
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  footerButton: {
    // padding: 10,
  },
  dataSpecificAlert: {
    right: "165%",
    top: "-5%",
    zIndex: 5,
    width: "140%",
    height: "180px",
    backgroundColor: 'rgba(50, 50, 50, 0.8)',
    borderRadius: 30,
    justifyContent: "center",
    padding: "5%",
  },
  dataSpecificAlertText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    justifyContent: "center"
  },

  more: {
    alignSelf: "center",
    right: "165%",
    top: "-10%",
    zIndex: 5,
    width: "140%",
    height: "500px",
    backgroundColor: 'rgba(50, 50, 50, 0.8)',
    borderRadius: 30,
    justifyContent: "flex-start",
    padding: "5%",
  }
});