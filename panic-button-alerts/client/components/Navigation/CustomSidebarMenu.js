import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { useTheme } from "@react-navigation/native";
import MyModal from "../cors/Modal";
import { AppContext } from "../context/AppContext";

import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { get, remove } from "../../services/Storage";
import { useTranslation } from "react-i18next";
import { decodeToken } from "../../services/JwtService";
import UploadImage from "../SettingsComponents/UploadImage";
export default function CustomSidebarMenu(props) {
  const { t, i18n } = useTranslation();
  const isHebrew = i18n.language === "he";
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [greet, setgreet] = useState("");

  const { isDarkTheme, setIsDarkTheme } = React.useContext(AppContext);
  const { colors } = useTheme();

  // if (isHebrew) {
  //   I18nManager.forceRTL(true);
  // } else {
  //   I18nManager.forceRTL(false);
  // }
  useEffect(() => {
    // Function to get and decode the token from AsyncStorage
    const fetchTokenAndDecode = async () => {
      try {
        const token = await decodeToken();
        setName(token.name);
      } catch (error) {
        console.error("Error retrieving and decoding token:", error);
      }
    };
    fetchTokenAndDecode(); // Call the function on component mount
    updatemes();
  }, []); // Empty dependency array ensures this effect runs only once\

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
  async function updatemes() {
    const time = new Date();
    const hour = time.getHours();
    if (hour < 13) {
      setgreet(t("Good Morning"));
    } else if (hour < 18) {
      setgreet(t("Good Afternoon"));
    } else {
      setgreet(t("Good Night"));
    }
  }

  return (
    <View
      style={[
        stylesSidebar.sidebarContainer,
        { backgroundColor: colors.background },
      ]}
    >
      <View style={[stylesSidebar.profileHeader]}>
        <Image
          style={stylesSidebar.image}
          source={{ uri: require("../../assets/images/user.png") }}
        />
        {/* <UploadImage/> */}
        <Text style={[stylesSidebar.text, { color: colors.primary }]}>
          {`${greet} ${name.toString()}`}
        </Text>
      </View>

      <View
        style={[
          stylesSidebar.profileHeaderLine,
          { backgroundColor: colors.primary },
        ]}
      />

      <DrawerContentScrollView
        {...props}
        // style={{ direction: isHebrew ? "rtl" : "ltr" }}
      >
        <DrawerItemList
          {...props}
          // style={{ direction: isHebrew ? "rtl" : "ltr" }}
        />
        <DrawerItem
          label={t("Log out")}
          onPress={showModal}
          labelStyle={stylesSidebar.drawerLabel}
          icon={({ focused, color, size }) => (
            <MaterialCommunityIcons
              name="logout"
              size={21}
              color={colors.text}
            />
          )}
        />

        <DrawerItem
          label={isDarkTheme ? t("Light mode") : t("Dark mode")}
          onPress={() => setIsDarkTheme((current) => !current)}
          labelStyle={stylesSidebar.drawerLabel}
          icon={({ focused, color, size }) => (
            <Icon
              name={isDarkTheme ? "weather-night" : "weather-sunny"}
              size={21}
              color={colors.text}
            />
          )}
        />
        <DrawerItem
          label={isHebrew ? "אנגלית" : "Hebrew"}
          onPress={() =>
            isHebrew ? i18n.changeLanguage("en") : i18n.changeLanguage("he")
          }
          labelStyle={stylesSidebar.drawerLabel}
          icon={({ focused, color, size }) => (
            <FontAwesome name="language" size={22} color={colors.text} />
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
}

const stylesSidebar = StyleSheet.create({
  sidebarContainer: {
    width: "100%",
    height: "100%",
    paddingTop: 40,
  },
  image: {
    height: 130,
    width: 130,
    borderRadius: 65,
  },
  text: {
    fontSize: 22,
    // marginVertical: 6,
    fontWeight: "bold",
  },
  profileHeader: {
    flexDirection: "column",
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
    marginTop: 15,
  },
  logoutIcon: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  drawerLabel: {
    // Style for DrawerItem labels
    textAlign: "left", // or 'right' for RTL languages like Hebrew
    // marginHorizontal: 20,
  },
});
