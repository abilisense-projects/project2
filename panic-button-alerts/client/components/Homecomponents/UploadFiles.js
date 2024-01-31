// 



// Example to Pick and Upload files in React Native
// https://aboutreact.com/file-uploading-in-react-native/

// Import React
import React, { useState } from 'react';
// Import core components
import {
  StyleSheet,
  Text,
  View,
  File,
  TouchableOpacity
} from 'react-native';

import axios from '../../services/axiosInstance';
import * as DocumentPicker from 'expo-document-picker';

const UploadFiles = () => {
  const [singleFile, setSingleFile] = useState(null);
  const selectFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
      });
      console.log(
        // result.output.length,
        // result.output.item(0),
        // result.output.item(0).uri,
        result.output.item(0).type, // mime type
        result.output.item(0).name,
        result.output.item(0).size,
      

      );
      setSingleFile(result)
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        throw err;
      }
    }
  };
  const uploadFile = async () => {
    // Check if any file is selected or not
    if (singleFile !== null) {
      try {
        const response = await axios.post(`upload/`, { File: singleFile.assets[0] },);
        let responseJson = await response.json();
        if (responseJson.status == 1) {
          alert('Upload Successful');
        }
        else {
          // If no file selected the show alert
          alert('Please Select File first');
        }
      } catch (error) {
        console.log(error);
      }
    };
  }
  
  return (
    <View style={styles.mainBody}>

      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={selectFile}>
        <Text style={styles.buttonTextStyle}>Select File</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={uploadFile}>
        <Text style={styles.buttonTextStyle}>Upload File</Text>
      </TouchableOpacity>
      {singleFile != null ? (
        <Text style={styles.textStyle}>
          File Name: {singleFile.output.item(0).name ? singleFile.output.item(0).name : ''}
          {'\n'}
          Type: {singleFile.output.item(0).type ? singleFile.output.item(0).type : ''}
          {'\n'}
          {/* File Size: {singleFile.output.item(0).size ? singleFile.output.item(0).size : ''}
          {'\n'}
          URI: {singleFile.output.item(0).uri ? singleFile.output.item(0).uri : ''}
          {'\n'} */}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    padding: "2%",
    alignItems: 'center',
    // height: '100%',
    // width: '100%',
  },
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: '40%',
    width: '60%',
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "2%",
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    // paddingVertical: 10,
    fontSize: 16,
  },
  textStyle: {
    // backgroundColor: '#fff',
    color: '#FFFFFF',
    fontSize: 13,
    // marginTop: 16,
    // marginLeft: 35,
    // marginRight: 35,
    textAlign: 'center',
  },
});

export default UploadFiles;