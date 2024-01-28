import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Switch, I18nManager } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { useTheme } from "@react-navigation/native";
const { jwtDecode } = require("jwt-decode");

import MyModal from "../Modal";
import { AppContext } from "../context/AppContext";

import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { get, remove } from "../../services/Storage";
import { useTranslation } from "react-i18next";

const CustomSidebarMenu = (props) => {
  const { t, i18n } = useTranslation();
  const isHebrew = i18n.language === "he";
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const { isDarkTheme, setIsDarkTheme } = React.useContext(AppContext);
  
  if (isHebrew) {
    I18nManager.forceRTL(true);
  } else {
    I18nManager.forceRTL(false);
  }
  useEffect(() => {
    // Function to get and decode the token from AsyncStorage
    const fetchTokenAndDecode = async () => {
      try {
        const token = await get("accessToken");
        if (token) {
          const decodedToken = jwtDecode(token);
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

  const handleLogout = async () => {
    try {
      await remove("accessToken");
      props.navigation.navigate("Auth");
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
    }
  };

  return (
    <View style={stylesSidebar.sideMenuContainer}>
      <View style={stylesSidebar.profileHeader}>
        <Image
          source={require("../../assets/user.png")}
          style={stylesSidebar.image}
        />
        <Text
          style={stylesSidebar.text}
        >
          {t(name.toString())}
        </Text>
      </View>

      <View style={stylesSidebar.profileHeaderLine} />

      <DrawerContentScrollView {...props}
        style={{ direction: isHebrew ? "rtl" : "ltr" }}
      >
        <DrawerItemList
          {...props}
          style={{ direction: isHebrew? "rtl" : "ltr" }}

        />
        <DrawerItem
          label={t("Log out")}
          onPress={showModal}
          icon={({ focused, color, size }) => (
            <MaterialCommunityIcons name="logout" size={size} color={color} />
          )}
        />

        <DrawerItem
          label={isDarkTheme ? t("Light mode") : t("Dark mode")}
          onPress={() => setIsDarkTheme((current) => !current)}
          icon={({ focused, color, size }) => (
            <Icon
              name={isDarkTheme ? "weather-night" : "weather-sunny"}
              size={size}
              color={color}
            />
          )}
        />
        <DrawerItem
          label={isHebrew ? "אנגלית" : "Hebrew"}
          onPress={() =>
           isHebrew
              ? i18n.changeLanguage("en")
              : i18n.changeLanguage("he")
          }
          icon={({ focused, color, size }) => (
            <FontAwesome name="language" size={size} color={color} />
          )}
        />
      </DrawerContentScrollView>
      <MyModal
        text={t("Are you sure you want to log out?")}
        visible={modalVisible}
        onConfirm={() => {
          handleLogout();
          hideModal();
        }}
        onCancel={hideModal}
        action={t("Log Out")}
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
  image:{
    height: 130,
    width: 130,
    borderRadius: 65,
  },
  text:{
    fontSize: 22,
    marginVertical: 6,
    fontWeight: "bold",
    color: "#111",
  },
  profileHeader: {
    // flexDirection: "row",
    backgroundColor: "#AD40AF",
    padding: 15,
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
    backgroundColor: "#AD40AF",
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
