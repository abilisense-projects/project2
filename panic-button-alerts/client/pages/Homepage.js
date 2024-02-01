import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, View, Text, Dimensions } from 'react-native';
import Alertscomp from '../components/Homecomponents/AlertsComponent';
import Specificall from '../components/Homecomponents/Specificallcomp';
import MapComponent from '../components/Homecomponents/MapComponent';
import { GridLayer } from 'leaflet';
import { Switch } from 'react-native-elements';
import { useTranslation } from 'react-i18next';
export default function Homepage() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    updatemes();
    setisSmallDevice(Dimensions.get('window').width < 768)
  }, []);
  const [Mes, setMes] = useState('');
  const [Id, setId] = useState('');
  const [Status, setStatus] = useState('')
  const [Alerts, setAlerts] = useState([])
  const [isSmallDevice, setisSmallDevice] = useState(false)
  //items from specific alert
 
  console.log(Dimensions.get('window').width);
  async function updatemes() {
    const time = new Date();
    const hour = time.getHours();
    if (hour < 13) {
      setMes('Good morning!');
    } else if (hour < 18) {
      setMes('Good afternoon');
    } else {
      setMes('Good night');
    }
  }
  function updateAlerts(value) {
    if (value.status == "created") {
      setAlerts(value.arr)
    }
    else if (value.status == "add") {
      setAlerts(current => [value.arr, ...current])
    }

  }
  function updateId(value, status) {
    setId(value);
    setStatus(status)
  }
  return (
    <View style={{ height: '90%', width: ' 100%' }}>
      {/* style={styles.container} */}
      <Text style={styles.headerTitle}>{Mes}</Text>

      <View style={isSmallDevice ? Id ? styles.smallDeviceSpesific : styles.smallDevice : styles.contentContainer}>

        <View style={isSmallDevice ? Id ? styles.AlertAndr : null : styles.Alert}>
          {/* <ScrollView horizontal={false} style={{ flex: 1 }}> */}
          <Alertscomp onIdchange={updateId} onAlertchange={updateAlerts} prop_id={Id} />
          {/* </ScrollView> */}
        </View>
        {/* <Specificall prop_id={Id}/> */}
        <View style={Id ? isSmallDevice ? styles.mapAndrSpecific : styles.mapWithSpecific : styles.mapContainer}>
          <MapComponent alerts={Alerts} /></View>
        {Id && <View style={(isSmallDevice) ? styles.SpecificAndr : styles.SpecificAlert}>

          <Specificall propId={Id} onIdchange={updateId} propStatus={Status} /></View>}

      </View>
      
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({

  contentContainer: {
    display: "flex",
    flexDirection: 'row',
    padding: 10,
    height: '80%',
    width: '100%',
    zIndex: '1'
  },
  Alert: {
    flex: 1,
    width: '15%'
    // alignItems: 'flex-start'
  },
  SpecificAlert: {
    paddingLeft: '2%',
    width: '25%'
  },

  mapContainer: {
    // flex: 1,
    width: '70%',
    height: '70%',
    borderWidth: 1, // Add border
    borderColor: 'black', // Border color
    borderRadius: 10, // Border radius
    overflow: 'hidden', // Ensure border-radius works as expected
  },
  mapWithSpecific: {
    width: '40%',
    borderWidth: 1, // Add border
    borderColor: 'black', // Border color
    borderRadius: 10, // Border radius
    overflow: 'hidden', // Ensure border-radius works as expected
  },
  mapAndrSpecific: {

    margin: '10%',
    gridColumn: '1/7',
    gridRow: '2'
  },
  SpecificAndr: {
    margin: '5%',
    gridColumn: '2/7',
    gridRow: ' 1'
  },
  AlertAndr: {
    marginTop: '50%',
    gridColumn: ' 1',
    gridRow: ' 1'
  },
  smallDevice: {
    display: 'grid',
    justifyItems: 'center'
  },
  smallDeviceSpesific: {
    display: 'grid',
    gridTemplateColumns: ' repeat(6, 1fr)'
  },
  text: {
    fontSize: 'large',
    color: 'black',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgb(197, 141, 200)',
    textAlign: 'center', 
    marginVertical: 10, // הוסיפי רווח מעל ומתחת לכותרת
  },
});