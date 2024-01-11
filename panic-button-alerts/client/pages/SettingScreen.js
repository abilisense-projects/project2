import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
const SettingScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>High</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerButtonText}>Open</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.helpButton}>
        <Text style={styles.helpButtonText}>Stop i need help</Text>
      </TouchableOpacity>
      <View style={styles.dateTime}>
        <Text style={styles.dateText}>Date: Sep 25, 2023</Text>
        <Text style={styles.timeText}>Time: 06:42 PM (GMT+2)</Text>
      </View>
      <TouchableOpacity style={styles.audioButton}>
        <Ionicons name="play" size={24} color="white" />
        <Text style={styles.audioText}>Part 1 06:42</Text>
      </TouchableOpacity>
      <View style={styles.menu}>
        <Ionicons name="map" size={24} color="white" />
        <FontAwesome5 name="sensor" size={24} color="white" />
        <FontAwesome5 name="balance-scale" size={24} color="white" />
        <Ionicons name="information-circle" size={24} color="white" />
        <FontAwesome5 name="ticket-alt" size={24} color="white" />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="checkmark" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
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
    color: 'white',
    fontSize: 16,
  },
  helpButton: {
    backgroundColor: 'pink',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  helpButtonText: {
    color: 'white',
    fontSize: 16,
  },
  dateTime: {
    marginBottom: 10,
  },
  dateText: {
    color: 'white',
    fontSize: 16,
  },
  timeText: {
    color: 'white',
    fontSize: 16,
  },
  audioButton: {
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  footerButton: {
    padding: 10,
  },
});
export default SettingScreen;