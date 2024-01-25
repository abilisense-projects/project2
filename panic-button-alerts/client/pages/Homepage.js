// import React from 'react';
// import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
// //import MapView from 'react-native-maps'; // You'll need to install this package
// import MapComponent from '../components/MapComponent';
// export default function App() {
//   // Example function to handle when an alert is pressed
//   const handleAlertPress = (alertId) => {
//     console.log('Alert pressed:', alertId);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Allsense</Text>
//         <View style={styles.filterContainer}>
//           <TouchableOpacity style={styles.filterButton}>
//             <Text style={styles.filterText}>Filters</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//       <View style={styles.main}>
//         <ScrollView style={styles.alertList}>
//           {/* You would map over your alerts here to create these components */}
//           <TouchableOpacity onPress={() => handleAlertPress(1)} style={styles.alertItem}>
//             <Text style={styles.alertText}>Fire Alarm</Text>
//             <Text style={styles.alertTime}>10:41 PM</Text>
//           </TouchableOpacity>
//           {/* ... other alerts */}
//         </ScrollView>
//         {/* <MapComponent
//           style={styles.map}
//           // Initial region should be set based on your requirements
//           initialRegion={{
//             latitude: 37.78825,
//             longitude: -122.4324,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}
//         /> */}
//         {/* ...other components like Specificall, etc. */}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#121212',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 10,
//     alignItems: 'center',
//   },
//   headerText: {
//     color: 'white',
//     fontSize: 20,
//   },
//   filterContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   filterButton: {
//     backgroundColor: '#333',
//     padding: 8,
//     borderRadius: 5,
//   },
//   filterText: {
//     color: 'white',
//   },
//   main: {
//     flex: 1,
//     flexDirection: 'row',
//   },
//   alertList: {
//     flex: 1,
//     backgroundColor: '#222',
//   },
//   alertItem: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#333',
//   },
//   alertText: {
//     color: 'white',
//   },
//   alertTime: {
//     color: '#aaa',
//   },
//   map: {
//     flex: 2,
//     borderWidth: 1,
//     borderColor: 'white',
//     borderRadius: 10,
//     overflow: 'hidden',
//   },
// });






import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text,Dimensions } from 'react-native';
import Alertscomp from '../components/alertcomps/AlertsComponent';
import Specificall from '../components/Specificallcomp';
import MapComponent from '../components/MapComponent';
import { GridLayer } from 'leaflet';
export default function Homepage() {
    useEffect(() => {
        updatemes();
        setisSmallDevice(Dimensions.get('window').width < 768)
    }, []);
    const [Mes, setMes] = useState('');
    const [Name, setName] = useState('Malka');
    const [Id, setId] = useState(null);
    const [Alerts,setAlerts]=useState([])
    const [isSmallDevice,setisSmallDevice] =useState(false) 
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
        if(value.status=="created"){
            setAlerts(value.arr)
        }
        else if (value.status=="add"){
            setAlerts(current => [value.arr, ...current])
        }
        
    }
    function updateId(value) {
        setId(value);
    }
    return (
        <View >
            {/* style={styles.container} */}
            <Text>{Mes} {Name}</Text>
            <View style={isSmallDevice?Id?styles.smallDeviceSpesific:styles.smallDevice:styles.contentContainer}>
               
          
       
               <View style={isSmallDevice? Id?styles.AlertAndr:null:styles.Alert}>
                <Alertscomp onIdchange={updateId} onAlertchange={updateAlerts} /></View>
              
                {/* <Specificall prop_id={Id}/> */}
                  <View style={Id?isSmallDevice?styles.mapAndrSpecific:styles.mapWithSpecific:styles.mapContainer}>
                    <MapComponent alerts={Alerts} /></View>
                <View style={(isSmallDevice&&Id)?styles.SpecificAndr:null}>
               
               {Id && <Specificall prop_id={Id} onIdchange={updateId} />}</View>
               
            </View>
            <StatusBar style="auto" />
        </View>
    );
}
const styles = StyleSheet.create({

  contentContainer: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  Alert:{
    width:'30%'
   // alignItems: 'flex-start'
  },
  SpecificAlert:{
   width: '25%'
  },
 
  mapContainer: {
   // flex: 1,
   width:'70%',
    borderWidth: 1, // Add border
    borderColor: 'black', // Border color
    borderRadius: 10, // Border radius
    overflow: 'hidden', // Ensure border-radius works as expected
  },
  mapWithSpecific:{
    width:'40%',
    borderWidth: 1, // Add border
    borderColor: 'black', // Border color
    borderRadius: 10, // Border radius
    overflow: 'hidden', // Ensure border-radius works as expected
  },
  mapAndrSpecific:{
    
    margin:'10%',
    gridColumn: '1/7',
    gridRow: '2'
  },
  SpecificAndr:{
    margin:'5%',
    gridColumn: '2/7',
    gridRow:' 1'
  },
 AlertAndr:{
  marginTop:'50%',
    gridColumn:' 1',
    gridRow:' 1'
  },
   smallDevice:{
    display: 'grid',
    justifyItems: 'center'
  },
  smallDeviceSpesific:{
    display: 'grid',
    gridTemplateColumns:' repeat(6, 1fr)'
  },
  text: {
    fontSize: 'large',
    color: 'black',
  },
});















// import * as React from 'react'
// import { Button, useWindowDimensions, View, Text, Image } from 'react-native'

// import CreateResponsiveStyle from '../components/ResponsiveStyle'

// export function FeatureCard() {
//   const layout = useWindowDimensions()
//   const styles = responsiveStyle(layout)

//   return (
//     <View style={styles('container')}>
//       <Image source={{ uri: 'https://images.google.com' }} style={[styles('cardImg'), { height: layout.width * 0.25 }]} />

//       <View style={styles('infoContainer')}>
//         <Text>CSA is the best way to support your local farmer.</Text>
//         <Text>Get the best and biggest pumpkins, squash, and fall decor from farms near you.</Text>
//         <Button title="Learn More"  />
//       </View>
//     </View>
//   )
// }

// const responsiveStyle = CreateResponsiveStyle(
//   {
//     container: {
//       borderRadius: 10,
//       marginVertical: 20,
//       backgroundColor: '#2F5D40',
//     },
//     cardImg: {
//       borderTopLeftRadius: 10,
//       borderBottomLeftRadius: 10,
//       flex: 1,
//       width: '80%',
//       minHeight: 350,
//     },
//     infoContainer: {
//       padding: 20,
//       width: '30%',
//       minWidth: 300,
//       alignSelf: 'center',
//     },
//   },
//   {
//     cardImg: {
//       borderTopLeftRadius: 10,
//       borderTopRightRadius: 10,
//       borderBottomLeftRadius: 0,
//       width: '100%',
//       height: 250,
//     },
//     infoContainer: {
//       width: '100%',
//     },
//   },
// )














