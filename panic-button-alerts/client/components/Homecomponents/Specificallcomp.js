import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import axios from '../../services/axiosInstance';
import { StyleSheet, View, Text, TouchableOpacity,FlatList } from 'react-native';
import { Ionicons, FontAwesome5, FontAwesome6, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import MyModal from "../../components/cors/Modal";
import TimerModal from './Time'
import UploadFiles from "./UploadFiles";
import SOSAlertForm from './SummarizeAlert';
import AlertCard from '../AlertCard';
import Loader from '../cors/Loader';
import { decodeToken } from "../../services/JwtService";
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
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true)
      const response = await axios.get(`/alerts/details/${propId}`);
      const result = response.data
      console.log(result)
      if (result) {
        setIsLoading(false)
        setdata(result)
      }
      
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
  }
  return (
    <View style={styles.container}>

      {data ? 
      <View>
       {propStatus == "for treatment" && < View style={{ top: "5%", height: "20px", width: '200px', right: "250px", zIndex: 5 }}>
          <TimerModal isVisible={alertDataTime.flag} onTime={handleSetTime} />
        </View >}
        <View style={styles.header}>
          <Text style={styles.headerText}>{data.alert.level}</Text>
          {propStatus == "for treatment" ? <Text style={styles.headerButtonText}>Open</Text> :
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
        
        <TouchableOpacity onPress={() => { setmoreDetails(!moreDetails) }} style={styles.audioButton}>
        <Text style={styles.more}> {moreDetails ? "Less Details" : "More Details"}</Text>

        </TouchableOpacity>
        <View style={styles.menu}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.column}>
              <MaterialCommunityIcons name="map-marker-radius-outline" size={"200%"} color="white" />
              <Text style={{ color: "white",fontSize:" 120%", }}>Map</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.column}
              onPress={() => setdataSpecificAlert({ ...dataSpecificAlert, flag: !dataSpecificAlert.flag, data: "Sensor" })}>
              <MaterialIcons name="sensors" size={"200%"} color="white" />
              <Text style={{ color: "white",fontSize:" 120%", }}>Sensor</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.column}
              onPress={() => { propStatus != "for treatment" || setdataSpecificAlert({ ...dataSpecificAlert, flag: !dataSpecificAlert.flag, data: "Evidence" }) }}>
              <FontAwesome5 name="magnifying-glass-chart" size={"200%"} color="white" />
              <Text style={{ color: "white" ,fontSize:" 120%",}}>Evidence</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.column}
              onPress={() => setdataSpecificAlert({ ...dataSpecificAlert, flag: !dataSpecificAlert.flag, data: "Trigger" })}>
              <MaterialCommunityIcons name="alarm-light-outline" size={"200%"} color="white" />
              <Text style={{ color: "white",fontSize:" 120%", }}>Trigger</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.column}
              onPress={() => { setdataSpecificAlert({ ...dataSpecificAlert, flag: !dataSpecificAlert.flag, data: "Instructions" }) }}>
              <MaterialIcons name="linear-scale" size={"200%"} color="white" />
              <Text style={{ color: "white",fontSize:" 120%", }}>Instructions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.column}
              onPress={() => { propStatus != "for treatment" || setdataSpecificAlert({ ...dataSpecificAlert, flag: !dataSpecificAlert.flag, data: "Ticketing" }) }}>
              <FontAwesome5 name="clipboard-list" size={"200%"}color="white" />
              <Text style={{ color: "white" ,fontSize:" 120%",}}>Ticketing</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footer}>
          {propStatus == "for treatment" && <TouchableOpacity style={styles.footerButton}
            onPress={() =>{alertData ? (updateAlert(data.alert._id, "treated"), onIdchange(''), setAlertDataTIme({ ...alertDataTime, flag: false }), setAlertData({})) : alert("you need to make summry")}}
              >
            <Ionicons name="checkmark" size={"200%"} color="white" />
            <Text style={{ color: "white" ,fontSize:"120%",}}>Applay</Text>
          </TouchableOpacity>}
          <TouchableOpacity style={styles.footerButton}
            onPress={() => { showModal(), setdataSpecificAlert({ ...dataSpecificAlert, flag: false, data: "" }) }}>
            <Ionicons name="close" size={"200%"} color="white" />
            <Text style={{ color: "white" ,fontSize:"120%",}}>Close</Text>
          </TouchableOpacity>
        </View>
      </View> : null}
      {dataSpecificAlert.flag &&
        <View style={dataSpecificAlert.data != "Ticketing" ? styles.dataSpecificAlert : {
          right: "165%",
          bottom: "50%",
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
      {moreDetails &&  <View style={styles.containermore}>
    <Text style={styles.title}>Diseases:</Text>
    {data.medicalConditions.map((item) => (
      <Text key={item._id} style={styles.listItem}>
        {item}
      </Text>
    ))}
    <TouchableOpacity
      style={styles.alertButton}
      onPress={() => setPreviousAlertShow({ falseAlert: false, trueAlert: true })}
    >
      <Text style={styles.alertButtonText}>Previous alerts: {PreviousAlert.trueAlert.length}</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.alertButton}
      onPress={() => setPreviousAlertShow({ falseAlert: true, trueAlert: false })}
    >
      <Text style={styles.alertButtonText}>Previous false alerts: {PreviousAlert.falseAlert.length}</Text>
    </TouchableOpacity>
    {PreviousAlertShow.trueAlert && (
      <FlatList
        style={styles.flatList}
        data={PreviousAlert.trueAlert}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <AlertCard alert={item} />}
      />
    )}
    {PreviousAlertShow.falseAlert && (
      <FlatList
        style={styles.flatList}
        data={PreviousAlert.falseAlert}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <AlertCard alert={item} />}
      />
    )}
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
          <Loader loading={isLoading} />

    </View>
  );
};
const styles = StyleSheet.create({
  moreContainer: {
    backgroundColor: 'rgba(28, 28, 30, 0.6)', // שימוש ברקע עם שקיפות
    borderRadius: 20,
    padding: 20, // ריווח פנימי גדול יותר
    marginHorizontal: 10, // שוליים אופקיים
    marginVertical: 5, // שוליים אנכיים
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,

    backgroundColor: '#1F1F1F', // A slightly lighter shade for cards
    borderRadius: 10,
    padding: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  headerText: {
    color: 'white',
    fontSize: "120%",
    fontWeight: 'bold',
  },
  helpButton: {
    backgroundColor: '#E91E63', // A vibrant color for important buttons
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 4,
    marginBottom: 5,
  },
  helpButtonText: {
    color: '#FFFFFF',
    fontSize:" 120%",
  },
  dateTime: {
    backgroundColor: '#1F1F1F', // A slightly lighter shade for cards
    borderRadius: 10,
    padding: 8,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  headerButtonText: {
    color: 'white',
    fontSize:" 120%",
    fontWeight: "bold"
  },
  dateText: {
    color: '#BBB',
    fontSize:" 120%",
  },
  timeText: {
    color: '#BBB',
    fontSize:" 120%",
  },
  audioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#1F1F1F',
    borderRadius: 10,
    marginBottom: 5,
  },
  audioText: {
    color: '#FFF',
    fontSize:" 120%",
    marginLeft: 10,
  },
  menu: {
    backgroundColor: '#1F1F1F',
    borderRadius: 5,
    padding: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  column: {
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 5,
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
    padding: 8,
    marginBottom: 5,
  },
  dataSpecificAlertText: {
    color: '#FFF',
    fontSize: '180%', // גודל טקסט קטן יותר
    marginBottom: 10, // ריווח בין טקסטים
    fontWeight: "bold"
  },
  containermore: {
    flex: 1,
    right: "165%",
    bottom: "50%",
    zIndex: 5,
    width: "140%",
    height: "400px",
    borderRadius: 30,
    padding: "5%",
    backgroundColor: '#333', // Assuming a dark theme
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
  },
  listItem: {
    color: 'white',
    fontSize: 18,
    paddingVertical: 5,
    paddingLeft: 10,
  },
  alertButton: {
    padding: 10,
    marginVertical: 5,
  },
  alertButtonText: {
    color: 'white',
    fontSize: 18,
  },
  flatList: {
    marginHorizontal: 10,
  },
  more1:{
    right: "165%",
    bottom: "20%",
    zIndex: 5,
    width: "140%",
    height: "400px",
    backgroundColor: 'white',
    borderRadius: 30,
    padding: "5%"
  },
  more: {
    flex: 1,
    backgroundColor: "#f5f5f5", // Notebook-like off-white background
    padding: 16,
  },
  moreText:{
    fontSize: 24,
    fontWeight: "600", // Semi-bold for better readability
    color: "#333333", // Dark color for the title for contrast
    marginBottom: 20,
    borderBottomWidth: 2, // Underline title like a notebook heading
    borderBottomColor: "#E33458", // Use the theme color for consistency
    paddingBottom: 5,
  },
  alertHard: {
    backgroundColor: '#E91E63', // ורוד
    borderRadius: 10,
    padding: 7,
  },
  alertMedium: {
    backgroundColor: '#FF9800', // כתום
    borderRadius: 10,
    padding: 7,
  },
  alertEasy: {
    backgroundColor: '#4CAF50', // ירוק
    borderRadius: 10,
    padding: 7,
  },
  defaultAlert: {
    backgroundColor: '#4CAF50', // ירוק
    padding: 7,
  },

});