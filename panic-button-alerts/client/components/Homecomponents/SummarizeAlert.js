import React, { useState } from "react";
import { View, Text, TextInput, CheckBox, Pressable, StyleSheet } from "react-native";
import DatePicker from 'react-native-datepicker';
export default function SOSAlertForm({ onDataAlert, toClose }) {
  const [alertData, setAlertData] = useState({
    EventTime: new Date(), 
    EventLocation: "",
    ThePatientContactedToYou: "",
    YouHaveContactedAContactOfTheCaller: false,
    Ambulance: false,
    Hospital: "",
    Summary: "",
    AdditionalComments: "",
    CompletionDate: new Date(),
    finishTime: new Date(),
  });
  function handleAlertDataChange(key, value) {
    setAlertData({ ...alertData, [key]: value });
  }
  function submitAlert() {
    console.log("alertData", alertData);
   
      onDataAlert(alertData);
      toClose();
    
    // Handle the submission of the SOS alert data here
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SOS Alert Summary</Text>
      
      <Text>Start Time:</Text>
      <DatePicker
        style={styles.input}
        date={alertData.EventTime}
        onDateChange={(newDate) => handleAlertDataChange("EventTime", newDate)}
        mode="datetime"
      />
      <TextInput
        style={styles.input}
        placeholder="Event Location"
        onChangeText={(text) => handleAlertDataChange("EventLocation", text)}
        value={alertData.EventLocation}
      />
      <Text>You have contacted a contact of the caller</Text>
      <CheckBox
        value={alertData.YouHaveContactedAContactOfTheCaller}
        onValueChange={(newValue) => handleAlertDataChange("YouHaveContactedAContactOfTheCaller", newValue)}
        style={styles.checkbox}
      />
      <Text>Ambulance:</Text>
      <CheckBox
        value={alertData.Ambulance}
        onValueChange={(newValue) => handleAlertDataChange("Ambulance", newValue)}
        style={styles.checkbox}
      />
      <TextInput
        style={styles.input}
        placeholder="Hospital"
        onChangeText={(text) => handleAlertDataChange("Hospital", text)}
        value={alertData.Hospital}
      />
      <TextInput
        style={styles.input}
        placeholder="Summary"
        onChangeText={(text) => handleAlertDataChange("Summary", text)}
        value={alertData.Summary}
      />
      <TextInput
        style={styles.input}
        placeholder="Additional Comments"
        onChangeText={(text) => handleAlertDataChange("AdditionalComments", text)}
        value={alertData.AdditionalComments}
      />
      <Text>End Time:</Text>
      <DatePicker
        style={styles.input}
        date={alertData.finishTime}
        onDateChange={(newDate) => handleAlertDataChange("finishTime", newDate)}
        mode="datetime"
      />
      <Pressable
        style={styles.button}
        onPress={submitAlert}
      >
        <Text style={styles.buttonText}>Submit Alert</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5", // Notebook-like off-white background
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "600", // Semi-bold for better readability
    color: "#333333", // Dark color for the title for contrast
    marginBottom: 20,
    borderBottomWidth: 2, // Underline title like a notebook heading
    borderBottomColor: "#E33458", // Use the theme color for consistency
    paddingBottom: 5,
  },
  input: {
    width: "100%", // Use full width for input fields
    height: 40,
    backgroundColor: "#fff", // White background for inputs
    borderColor: "#E33458", // Theme color for borders
    borderWidth: 1,
    borderRadius: 5, // Rounded corners for inputs
    marginBottom: 15,
    paddingHorizontal: 10, // Horizontal padding
    fontSize: 16, // Slightly larger font size for readability
    shadowColor: '#000', // Shadow for depth
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2, // Elevation for Android
  },
  checkbox: {
    alignSelf: "flex-start", // Align checkbox to the start
    marginVertical: 10, // Vertical spacing
    // Style the checkbox if possible, or use a custom component
  },
  button: {
    backgroundColor: "#E33458", // Theme color for the button
    width: "100%", // Full width button
    height: 50,
    alignItems: "center", // Center text horizontally
    justifyContent: "center", // Center text vertically
    borderRadius: 5, // Rounded corners for the button
    marginTop: 20,
    marginBottom: 30,
    shadowColor: '#000', // Shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3, // Elevation for Android
  },
  buttonText: {
    color: "#fff", // White text for the button
    fontSize: 18, // Larger font size for the button
    fontWeight: "500", // Medium weight for the button text
  },
});