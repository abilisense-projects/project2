import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import axios from '../../services/axiosInstance';
import { StyleSheet, View, Text, TouchableOpacity,FlatList } from 'react-native';
import { Ionicons, FontAwesome5, FontAwesome6, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import MyModal from "../Modal";
import TimerModal from './Time'
import UploadFiles from "./UploadFiles";
import SOSAlertForm from './SummarizeAlert';
import AlertCard from '../AlertCard';
import { decodeToken } from "../../services/";
// run animation... (`runAfterInteractions` tasks are queued)
// later, on animation completion:
//InteractionManager.clearInteractionHandle(handle);
// queued tasks run if all handles were cleared
export default function Specificall({ propId, onIdchange, propStatus }) {
  useEffect(() => {
    getInfoAlerts()
    getPreviousAlerts()

    { propStatus == "for treatment" ? setAlertDataTIme({ ...alertDataTime, flag: true }) : setAlertDataTIme({ ...alertDataTime, flag: false }) }
  }, [propId]);
  const [data, setdata] = useState(null)
  const [PreviousAlert, setPreviousAlert] = useState({ falseAlert: [], trueAlert: [] })
  const [PreviousAlertShow, setPreviousAlertShow] = useState({ falseAlert: false, trueAlert: false })
  const [modalVisible, setModalVisible] = useState(false);
  const [moreDetails, setmoreDetails] = useState(false);
  const [dataSpecificAlert, setdataSpecificAlert] = useState({ flag: false, data: " " });
  const [alertData, setAlertData] = useState();
  const [alertDataTime, setAlertDataTIme] = useState({ flag: false, time: 0 });
  const showModal = () => {
    setModalVisible(true);
  };
  const hideModal = () => {
    setModalVisible(false);
  };
  function handleSetTime(value) {
    setAlertDataTIme({ ...alertDataTime, time: value })
  };
  function handleSetAlertData(value) {
    setAlertData(value)
  };
  function handleSetdataSpecificAlert() {
    ; setdataSpecificAlert({ ...dataSpecificAlert, flag: false, data: "" })
  }

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
    console.log(alertData);
    try {
      const response = await axios.get(`/history/patient/${propId}`);
      const result = response.data
      console.log("history/patient   "+result.length)
      const countFalse = [], countTrue = [];
      for (let index = 0; index < result.length; index++) {
        const element = result[index];
        if (element.status == "cancel") {
          countFalse.push(element)
        }
        else {
          countTrue.push(element)
        }
        setPreviousAlert({ ...PreviousAlert, falseAlert:countFalse })
        setPreviousAlert({ ...PreviousAlert, trueAlert:countTrue})
      }
    } catch (error) {
      console.log(error)
    }
  }
  async function handleLeaveAlert() {
    console.log(PreviousAlert)
    try {
      const response = await axios.post(`alerts/`, { id: data.alert._id, status: "not treated" },);
      const result = response.data
      console.log(result)
    } catch (error) {
      console.log("error" + error);
    }

  }
  async function updateAlert(IdAlert, msgState) {
    try {
      const token = await decodeToken();
      const response = await axios.post(`alerts/treated/`, { id: IdAlert, status: msgState, userId: token.id, duration: alertDataTime.time, summary: alertData });
      const result = response.data

    } catch (error) {
      console.log(error);
    }
  }return (
    <View style={styles.container}>

      {data ? 
      <View>
        {propStatus == "not treated" && < View style={{ top: "5%", height: "20px", width: '200px', right: "250px", zIndex: 5 }}>
          <Text style={styles.headerButtonText}> you care:</Text>
          <TimerModal isVisible={alertDataTime.flag} onTime={handleSetTime} />
        </View >}
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
              <MaterialCommunityIcons name="map-marker-radius-outline" size={"200%"} color="white" />
              <Text style={{ color: "white",fontSize:" 150%", }}>Map</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.column}
              onPress={() => setdataSpecificAlert({ ...dataSpecificAlert, flag: !dataSpecificAlert.flag, data: "Sensor" })}>
              <MaterialIcons name="sensors" size={"200%"} color="white" />
              <Text style={{ color: "white",fontSize:" 150%", }}>Sensor</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.column}
              onPress={() => { propStatus != "for treatment" || setdataSpecificAlert({ ...dataSpecificAlert, flag: !dataSpecificAlert.flag, data: "Evidence" }) }}>
              <FontAwesome5 name="magnifying-glass-chart" size={"200%"} color="white" />
              <Text style={{ color: "white" ,fontSize:" 150%",}}>Evidence</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.column}
              onPress={() => setdataSpecificAlert({ ...dataSpecificAlert, flag: !dataSpecificAlert.flag, data: "Trigger" })}>
              <MaterialCommunityIcons name="alarm-light-outline" size={"200%"} color="white" />
              <Text style={{ color: "white",fontSize:" 150%", }}>Trigger</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.column}
              onPress={() => { setdataSpecificAlert({ ...dataSpecificAlert, flag: !dataSpecificAlert.flag, data: "Instructions" }) }}>
              <MaterialIcons name="linear-scale" size={"200%"} color="white" />
              <Text style={{ color: "white",fontSize:" 150%", }}>Instructions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.column}
              onPress={() => { propStatus != "for treatment" || setdataSpecificAlert({ ...dataSpecificAlert, flag: !dataSpecificAlert.flag, data: "Ticketing" }) }}>
              <FontAwesome5 name="clipboard-list" size={"200%"}color="white" />
              <Text style={{ color: "white" ,fontSize:" 150%",}}>Ticketing</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footer}>
          {propStatus == "for treatment" && <TouchableOpacity style={styles.footerButton}
            onPress={() =>{alertData ? (updateAlert(data.alert._id, "treated"), onIdchange(''), setAlertDataTIme({ ...alertDataTime, flag: false }), setAlertData({})) : alert("you need to make summry")}}
              >
            <Ionicons name="checkmark" size={"200%"} color="white" />
            <Text style={{ color: "white" ,fontSize:"150%",}}>Applay</Text>
          </TouchableOpacity>}
          <TouchableOpacity style={styles.footerButton}
            onPress={() => { showModal(), setdataSpecificAlert({ ...dataSpecificAlert, flag: false, data: "" }) }}>
            <Ionicons name="close" size={"200%"} color="white" />
            <Text style={{ color: "white" ,fontSize:"150%",}}>Close</Text>
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
          padding: "5%", }}>
          {dataSpecificAlert.data == "Sensor" ?
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
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
                {'\n'}</Text>
            </View> :
            dataSpecificAlert.data == "Evidence" ? <UploadFiles/> :
              dataSpecificAlert.data == "Trigger" ? <Text style={styles.dataSpecificAlertText}>Type: Message</Text> :
                dataSpecificAlert.data == "Instructions" ? <Text style={styles.dataSpecificAlertText}>no further instruction</Text> :
                  dataSpecificAlert.data == "Ticketing" ?(
                      <SOSAlertForm onDataAlert={{handleSetAlertData}} toClose={{handleSetdataSpecificAlert}}/> ): null}
        </View>}
      {moreDetails && <View style={styles.more}>
        <Text style={styles.dataSpecificAlertText}>   Diseases:{'\n'}</Text>

        {data.medicalConditions.map((item, key) =>{ return ( <View key={item._id}>
          <Text style={{ color: 'white', fontSize: "150%", }} >{item}{'\n'}</Text></View>)}

        )}
        <Text style={styles.dataSpecificAlertText}> {'\n'}{'\n'}  Previous alerts:{'\n'}</Text>
        <TouchableOpacity onPress={() => setPreviousAlertShow({ ...PreviousAlertShow, falseAlert: false, trueAlert: true })}>
          <Text style={{ color: 'white', fontSize: "150%", }}>Previous alerts: {PreviousAlert.trueAlert.length}</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setPreviousAlertShow({ ...PreviousAlertShow, falseAlert: true, trueAlert: false })}>
          <Text style={{ color: 'white', fontSize: "150%", }}>Previous false alerts: {PreviousAlert.falseAlert.length}</Text></TouchableOpacity>
        {PreviousAlertShow.trueAlert && <FlatList
        data={PreviousAlert.trueAlert}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <AlertCard alert={item} />}
      />}
        {PreviousAlertShow.falseAlert && <FlatList
        data={PreviousAlert.falseAlert}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <AlertCard alert={item} />}
      />}
      </View>}
      <MyModal
        text={"Are you sure you want to leave?"}
        visible={modalVisible}
        onConfirm={() => {
          {
            propStatus == "for treatment" ?
              (handleLeaveAlert(), onIdchange('')) : onIdchange('')
          }
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
    backgroundColor: '#121212', // A standard dark background
    padding: '5%',
    borderRadius: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    color: '#FFF',
    fontSize: "150%",
    fontWeight: 'bold',
  },
  helpButton: {
    backgroundColor: '#E91E63', // A vibrant color for important buttons
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 4,
    marginBottom: 10,
  },
  helpButtonText: {
    color: '#FFFFFF',
    fontSize:" 150%",
  },
  dateTime: {
    backgroundColor: '#1F1F1F', // A slightly lighter shade for cards
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  headerButtonText: {
    color: 'white',
    fontSize:" 150%"
  },
  dateText: {
    color: '#BBB',
    fontSize:" 150%",
  },
  timeText: {
    color: '#BBB',
    fontSize:" 150%",
  },
  audioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1F1F1F',
    borderRadius: 10,
    marginBottom: 10,
  },
  audioText: {
    color: '#FFF',
    fontSize:" 150%",
    marginLeft: 10,
  },
  menu: {
    backgroundColor: '#1F1F1F',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  column: {
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  footerButton: {
    backgroundColor: '#333',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 4,
  },
  dataSpecificAlert: {
    backgroundColor: '#1F1F1F',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  dataSpecificAlertText: {
    color: '#FFF',
    fontSize:" 150%",
  },
  more: {
    backgroundColor: '#1F1F1F',
    borderRadius: 10,
    padding: 16,
  },
});