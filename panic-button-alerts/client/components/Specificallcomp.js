import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import axios from '../services/axiosInstance';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
export default function Specificall({ prop_id ,onIdchange}) {
    useEffect(() => {
        getInfoAlerts()
    }, []);
    const [data, setdata] = useState(null)
    async function getInfoAlerts() {
        try {

            const response = await axios.get(`/alerts/details/${prop_id}`);
            const result = response.data
            console.log(result)
            setdata(result)
        } catch (error) {
            console.log(error)
        }
    }

    async function updateAlert(IdAlert, msgState) {
        try {

            const response = await axios.post(`alerts/`, { id: IdAlert, status: msgState },);
            const result = response.data

        } catch (error) {
            console.log(error);
        }
    }
    // "alert": {
    //     "_id": "659d3cac4a2d1045b0317003",
    //     "patient": "658bdfff217a5a3a41958a65",
    //     "date": "2024-01-09T14:31:40.470Z",
    //     "update": "2024-01-09T14:31:40.470Z",
    //     "distressDescription": "Injury",
    //     "status": "not treated",
    //     "location": {
    //       "_id": "659d3cac4a2d1045b0317004"
    //     },
    return (
        <View style={styles.container}>
           {data && <View>
                <View style={styles.header}>
               <TouchableOpacity style={styles.helpButton}>
                   <Text style={styles.helpButtonText}>{data.alert.level}</Text>
                   <Text style={styles.helpButtonText}>open</Text>
                 </TouchableOpacity>
               </View>
             
              <View style={styles.body}>

              <TouchableOpacity style={styles.helpButton}>
              <Text style={styles.helpButtonText}>{data.alert.distressDescription}</Text>
            </TouchableOpacity>

                 <Text style={styles.dateText}>Date: {data.alert.date.split('T')[0]}</Text>
                 <Text style={styles.timeText}>Time: {data.alert.date.split('T')[1].split('.')[0]}</Text>
               
                {/* //  <View style={styles.partContainer}>
                //    <Text style={styles.partText}>Part 1</Text>
                //    <Text style={styles.partTime}>06:42</Text>
                //  </View>
                */}
                 {/* <View style={styles.iconContainer}>
                   <FontAwesomeIcon icon={faMap} style={styles.icon} />
                   <FontAwesomeIcon icon={faSensor} style={styles.icon} /> */}
                   {/* Other icons */}
                 {/* </View> */}
               
                  <View style={styles.footer}>
                   <TouchableOpacity style={styles.applyButton}>
                     <Text style={styles.applyButtonText}>Apply</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={styles.closeButton}
                   onPress={() =>{updateAlert(data.alert._id,"treated"), onIdchange(null)}}>
                     <Text style={styles.closeButtonText}>Close</Text>
                   </TouchableOpacity>
                 </View>
               </View>
            </View>}


         
        </View>
    );
}

// const styles = StyleSheet.create({
//     container: {
//       height:'50%',
//       width: '20%',
//       backgroundColor:'blue'
//     },
//     text: {
//         fontSize: 'large',
//         color: 'white'
//     },
//   })



// const App = () => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.helpButton}>
//           <Text style={styles.helpButtonText}>Stop i need help</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.body}>
//         <Text style={styles.dateText}>Date: Sep 25, 2023</Text>
//         <Text style={styles.timeText}>Time: 06:42 PM (GMT +2)</Text>

//         <View style={styles.partContainer}>
//           <Text style={styles.partText}>Part 1</Text>
//           <Text style={styles.partTime}>06:42</Text>
//         </View>

//         <View style={styles.iconContainer}>
//           <FontAwesomeIcon icon={faMap} style={styles.icon} />
//           <FontAwesomeIcon icon={faSensor} style={styles.icon} />
//           {/* Other icons */}
//         </View>

//         <View style={styles.footer}>
//           <TouchableOpacity style={styles.applyButton}>
//             <Text style={styles.applyButtonText}>Apply</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.closeButton}>
//             <Text style={styles.closeButtonText}>Close</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// //const styles = StyleSheet.create({
//   // Define your styles here
// //});

// export default App;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'pink', // Assuming the background is black
        height:'65%'
       //width:'15%'
    },
    header: {
        // Style for header
    },
    helpButton: {
        // Style for help button
    },
    helpButtonText: {
        color: 'white', // Assuming the text is white
        // Other text styling
    },
    // Other styles for dateText, timeText, partContainer, etc.
});