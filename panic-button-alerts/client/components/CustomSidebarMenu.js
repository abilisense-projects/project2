import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Switch } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyModal from "./Modal";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { jwtDecode } = require("jwt-decode");
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CustomSidebarMenu = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Function to get and decode the token from AsyncStorage
    const fetchTokenAndDecode = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        console.log(token);
        if (token) {
          console.log(jwtDecode(token));
          const decodedToken = jwtDecode(token);
          console.log(decodedToken);
          setName(decodedToken.name);
        }
      } catch (error) {
        console.error("Error retrieving and decoding token:", error);
      }
    };
    fetchTokenAndDecode(); // Call the function on component mount
  }, []); // Empty dependency array ensures this effect runs only once

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // You can add logic here to change the app theme based on the darkMode state
    // For example, you can use a library like react-native-appearance or change your styles dynamically
  };
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      props.navigation.replace("Auth");
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
    }
  };

  return (
    <View style={stylesSidebar.sideMenuContainer}>
      <View style={stylesSidebar.profileHeader}>
        <Image
          source={require("../assets/user.png")}
          style={{
            height: 130,
            width: 130,
            borderRadius: 65,
          }}
        />
        <Text
          style={{
            fontSize: 22,
            marginVertical: 6,
            fontWeight: "bold",
            color: "#111",
          }}
        >
          {name}
        </Text>
      </View>

      <View style={stylesSidebar.profileHeaderLine} />

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Log out"
          onPress={showModal}
          icon={({ focused, color, size }) => (
            <MaterialCommunityIcons name="logout" size={size} color={color} />
          )}
        />

        <DrawerItem
          label="Dark Mode"
          onPress={toggleDarkMode}
          icon={({ focused, color, size }) => (
            <Icon
              name={darkMode ? "weather-night" : "weather-sunny"}
              size={size}
              color={color}
            />
          )}
        />
      </DrawerContentScrollView>
      <MyModal
        text={"Are you sure you want to log out?"}
        visible={modalVisible}
        onConfirm={() => {
          handleLogout();
          hideModal();
        }}
        onCancel={hideModal}
      />
    </View>
  );
};

export default CustomSidebarMenu;

const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#AD40AF",
    paddingTop: 40,
    color: "white",
  },
  profileHeader: {
    // flexDirection: "row",
    backgroundColor: "#AD40AF",
    padding: 15,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  profileHeaderPicCircle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    color: "white",
    backgroundColor: "#ffffff",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  profileHeaderText: {
    color: "white",
    alignSelf: "center",
    paddingHorizontal: 10,
    fontWeight: "bold",
  },
  profileHeaderLine: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: "#e2e2e2",
    marginTop: 15,
  },
  logoutIcon: {
    flexDirection: "row",
    justifyContent: "flex-start",
    // padding: 10,
  },
  logoutLabel: {
    marginLeft: 10,
    color: "#d8d8d8",
  },
});
