import React, { useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ImageService from './ImageService';

export default function BugReport({ isVisible, onClose, onSubmit }) {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
        try {
            const codedImage = await ImageService.encode(result.assets[0].uri);
            // const maxAllowedSize = 100 * 1024;
            // if (codedImage.length > maxAllowedSize) {
            //   setImage(null);
            // } else {
              setImage(result.assets[0].uri);
          
            // }
          } catch (error) {
            console.log(error);
          }
    }
  };

  const handleSubmit = () => {
    onSubmit({ description, image });
    setDescription('');
    setImage(null);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
        <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            placeholder="Describe the bug"
            value={description}
            onChangeText={setDescription}
            multiline
          />
          <View style={styles.buttonContainer}>
            <Button title="Pick an Image from Gallery" onPress={pickImage} />
          </View>
          {image && (
            <Image
              key={image}
              source={{ uri: image }}
              style={styles.imagePreview}
            />
          )}
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: for the overlay background
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%', // Adjust as needed
    // other styles as needed
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 20,
    backgroundColor: 'lightgrey', // Adjust as needed
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Make sure it's above other elements
  },
  closeButtonText: {
    fontSize: 18,
    color: 'black',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 20,
    padding: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20, // Added margin bottom for space between buttons and the image or submit button
  },
  imagePreview: {
    width: 250,
    height: 250,
    marginBottom: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});


