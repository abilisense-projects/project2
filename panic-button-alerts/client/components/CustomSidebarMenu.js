// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import AsyncStorage from "@react-native-async-storage/async-storage";
import LogoutModal from "./LogoutModal";
import { AntDesign } from '@expo/vector-icons';


const CustomSidebarMenu = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
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
          Isabella Joanna
        </Text>
      </View>

      <View style={stylesSidebar.profileHeaderLine} />

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props}/>
        <DrawerItem
        label={({ color }) => <View style={stylesSidebar.logoutIcon} >
        <AntDesign name="logout" size={20} color="#d8d8d8" />
        <Text style={stylesSidebar.logoutLabel}>Logout</Text>
      </View>}
        onPress={showModal}
        />

      <LogoutModal
        visible={modalVisible}
        onConfirm={() => {
          handleLogout();
          hideModal();
        }}
        onCancel={hideModal}
      />
      </DrawerContentScrollView>
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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // padding: 10,
  },
  logoutLabel: {
    marginLeft: 10,
    color: '#d8d8d8',
  },
});
