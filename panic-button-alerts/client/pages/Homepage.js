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
import { StyleSheet, View, Text } from 'react-native';
import Alertscomp from '../components/alertcomps/AlertsComponent';
import Specificall from '../components/Specificallcomp';
import MapComponent from '../components/MapComponent';
export default function Homepage() {
    useEffect(() => {
        updatemes();
    }, []);
    const [Mes, setMes] = useState('');
    const [Name, setName] = useState('Malka');
    const [Id, setId] = useState(null);
    const [Alerts,setAlerts]=useState([])
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
        <View style={styles.container}>
            <Text>{Mes} {Name}</Text>
            <View style={styles.contentContainer}>
                <Alertscomp onIdchange={updateId} onAlertchange={updateAlerts} />
                <View style={styles.mapContainer}>
                    <MapComponent alerts={Alerts}/>
                </View>
                {/* <Specificall prop_id={Id}/> */}
                {Id && <Specificall prop_id={Id} />}
                
            </View>
            <StatusBar style="auto" />
        </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  mapContainer: {
    flex: 1,
    borderWidth: 1, // Add border
    borderColor: 'black', // Border color
    borderRadius: 10, // Border radius
    overflow: 'hidden', // Ensure border-radius works as expected
  },
  text: {
    fontSize: 'large',
    color: 'black',
  },
});















// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#121212', // Assuming a dark theme from the picture
//     },
//     contentContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         padding: 10,
//         backgroundColor: '#1e1e1e', // Adjusted to a dark grey to match the panel background in the picture
//     },
//     mapContainer: {
//         flex: 1,
//         borderWidth: 2, // The border looks thicker in the picture
//         borderColor: '#ffffff', // The border color seems to be white
//         borderRadius: 20, // Increased the border-radius to match the rounded corners in the image
//         overflow: 'hidden',
//         margin: 10, // Added margin to separate from other elements
//         backgroundColor: '#323232', // Adjusting the map background to a grey to mimic the map's look
//     },
//     text: {
//         fontSize: 20, // Assuming 'large' is roughly 20
//         color: 'white', // Text color is white to stand out on the dark background
//         fontWeight: 'bold', // The text appears to be bold
//     },
// });














