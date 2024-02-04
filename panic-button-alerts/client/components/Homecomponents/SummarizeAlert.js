import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function SOSAlertForm(onDataAlert,toClose) {
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
   
    function handleAlertDataChange (key, value)  {
    setAlertData({ ...alertData, [key]: value });
    
  };

  function submitAlert(){
     console.log("alertData   "+alertData);
    onDataAlert.onDataAlert.handleSetAlertData(alertData)
    onDataAlert.toClose.handleSetdataSpecificAlert()
    // Handle the submission of the SOS alert data here
   
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SOS Alert Summary</Text>
      {/* Render input fields for each item in the SOS alert */}
      {/* Example: */}
      {/* <TextInput
        style={styles.input}
        placeholder="Date and Time"
        onChangeText={(text) => handleAlertDataChange('dateAndTime', text)}
        value={alertData.dateAndTime}
      />

      <TextInput
  style={styles.input}
  placeholder="Caller's Name"
  onChangeText={(text) => handleAlertDataChange('callerName', text)}
  value={alertData.callerName}
/>

<TextInput
  style={styles.input}
  placeholder="Location of Incident"
  onChangeText={(text) => handleAlertDataChange('location', text)}
  value={alertData.location}
/> */}

<TextInput
  style={styles.input}
  placeholder="Nature of Emergency"
  onChangeText={(text) => handleAlertDataChange('natureOfEmergency', text)}
  value={alertData.natureOfEmergency}
/>

<TextInput
  style={styles.input}
  placeholder="Caller's Contact Number"
  onChangeText={(text) => handleAlertDataChange('callerContactNumber', text)}
  value={alertData.callerContactNumber}
/>

<TextInput
  style={styles.input}
  placeholder="Description of the Situation"
  onChangeText={(text) => handleAlertDataChange('description', text)}
  value={alertData.description}
/>

<TextInput
  style={styles.input}
  placeholder="Assessment of Severity"
  onChangeText={(text) => handleAlertDataChange('severity', text)}
  value={alertData.severity}
/>

<TextInput
  style={styles.input}
  placeholder="Known Hazards or Safety Concerns"
  onChangeText={(text) => handleAlertDataChange('hazards', text)}
  value={alertData.hazards}
/>

<TextInput
  style={styles.input}
  placeholder="Actions Taken by Operator"
  onChangeText={(text) => handleAlertDataChange('actionsTaken', text)}
  value={alertData.actionsTaken}
/>

<TextInput
  style={styles.input}
  placeholder="Additional Notes"
  onChangeText={(text) => handleAlertDataChange('additionalNotes', text)}
  value={alertData.additionalNotes}
/>

<TextInput
  style={styles.input}
  placeholder="Operator's Name"
  onChangeText={(text) => handleAlertDataChange('operatorName', text)}
  value={alertData.operatorName}
/>

<TextInput
  style={styles.input}
  placeholder="Operator's ID/Reference Number"
  onChangeText={(text) => handleAlertDataChange('operatorID', text)}
  value={alertData.operatorID}
/>

<TextInput
  style={styles.input}
  placeholder="Date and Time of Completion"
  onChangeText={(text) => handleAlertDataChange('completionDateAndTime', text)}
  value={alertData.completionDateAndTime}
/>

      
      <TouchableOpacity onPress={() => {submitAlert()}}> <Text>Submit Alert </Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});