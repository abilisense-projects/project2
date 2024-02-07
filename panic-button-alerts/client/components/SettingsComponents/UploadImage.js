import React, { useState, useEffect } from 'react';
import { Image, View, Pressable, StyleSheet, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import im1 from '../../assets/images/user.png';
import ImageService from './ImageService';

export default function UploadImage() {
  const [image, setImage] = useState(im1);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
 
    checkForCameraRollPermission();
  }, []);

  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!_image.canceled) {
      setErrorMessage(null);
      try {
        const codedImage = await ImageService.encode(_image.assets[0].uri);
        const maxAllowedSize = 100 * 1024;
        if (codedImage.length > maxAllowedSize) {
          setImage(null);
        //   setErrorMessage(translate("profile image too large"));
        } else {
          setImage(_image.assets[0].uri);
        //   const response = await UserService.uploadProfileImage(
        //     user._id,
        //     codedImage
        //   );
        }
      } catch (error) {
        console.log(error);
        // setErrorMessage("Error accured. Please try again.");
      }
    }
  };

  const checkForCameraRollPermission = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert(
        "Please grant camera roll permissions inside your system's settings"
      );
    }
  };

  return (
    <View>
      <View style={imageUploaderStyles.container}>
        {image && (
          <Image source={{ uri: image }} style={imageUploaderStyles.image} />
        )}
        {errorMessage && (
          <Text style={imageUploaderStyles.errorMessage}>{errorMessage}</Text>
        )}
        <View style={imageUploaderStyles.uploadBtnContainer}>
          <Pressable onPress={addImage} style={imageUploaderStyles.uploadBtn}>
            <AntDesign name="camera" size={20} color="#E33458" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 150,
    width: 150,
    backgroundColor: "#efefef",
    position: "relative",
    borderRadius: 999,
    overflow: "hidden",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  uploadBtnContainer: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: "100%",
    height: "30%",
  },
  uploadBtn: {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    fontSize: 12,
  },
});