import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import axios from '../services/axiosInstance';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMap, faSensor, faTicket } from '@fortawesome/free-solid-svg-icons';


export default function Specificall({prop_id}) {
    useEffect(() => {
        getInfoAlerts()
    }, []);
    const [data ,setdata]=useState(null)
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


    return (
        <View style={styles.container}>
             <View style={styles.header}>
               <TouchableOpacity style={styles.helpButton}>
                   <Text style={styles.helpButtonText}>Stop i need help</Text>
                 </TouchableOpacity>
               </View>
             
              <View style={styles.body}>
                 <Text style={styles.dateText}>Date: Sep 25, 2023</Text>
                 <Text style={styles.timeText}>Time: 06:42 PM (GMT +2)</Text>
               
                 <View style={styles.partContainer}>
                   <Text style={styles.partText}>Part 1</Text>
                   <Text style={styles.partTime}>06:42</Text>
                 </View>
               
                 {/* <View style={styles.iconContainer}>
                   <FontAwesomeIcon icon={faMap} style={styles.icon} />
                   <FontAwesomeIcon icon={faSensor} style={styles.icon} /> */}
                   {/* Other icons */}
                 {/* </View> */}
               
                 <View style={styles.footer}>
                   <TouchableOpacity style={styles.applyButton}>
                     <Text style={styles.applyButtonText}>Apply</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={styles.closeButton}>
                     <Text style={styles.closeButtonText}>Close</Text>
                   </TouchableOpacity>
                 </View>
               </View>
             
            <Text style={styles.text}>קריאה ספציפית</Text>
            <Text>{prop_id}</Text>
           {data&& <Text style={styles.text}>"data"+{data[0].patient}</Text>}
            
            <StatusBar style="auto" />
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