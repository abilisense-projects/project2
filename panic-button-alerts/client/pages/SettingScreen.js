import React, { useState, useContext, useCallback, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Switch,
  Linking,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useTranslation } from "react-i18next"; // Import useTranslation hook
import { AppContext } from "../components/context/AppContext";
import UpdateProfile from "../components/SettingsComponents/UpdateProfile";
import { decodeToken } from "../services/JwtService";
import { MAIL } from "@env";
import BugReport from "../components/SettingsComponents/BugReport";
import { Image } from "react-native-elements";
export default function Setting() {
  const { t, i18n } = useTranslation();
  const { isDarkTheme, setIsDarkTheme } = useContext(AppContext);
  const [isBugReportModalVisible, setBugReportModalVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [editProfileDetails, setEditProfileDetails] = useState({
    _id: "",
    name: "",
    email: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      const token = await decodeToken();
      setEditProfileDetails({
        _id: token._id,
        name: token.name,
        email: token.email,
      });
    };

    fetchData();
  }, []);
  const isHebrew = i18n.language === "he";

  const toggleLanguage = () => {
    isHebrew ? i18n.changeLanguage("en") : i18n.changeLanguage("he");
  };
  const toggleTheme = () => {
    setIsDarkTheme((current) => !current);
  };
  const handleContactUs = () => {
    const email = MAIL;
    const subject = encodeURIComponent("Need Help");
    const body = encodeURIComponent("Hi there,\n\nI need help with...");
    Linking.openURL(`mailto:${email}?subject=${subject}&body=${body}`);
  };

  const SECTIONS = [
    {
      header: "Preferences",
      items: [
        { id: "language", icon: "globe", label: t("Language"), type: "select" },
        { id: "darkMode", icon: "moon", label: t("Dark Mode"), type: "toggle" },
      ],
    },
    {
      header: "Help",
      items: [
        {
          id: "bug",
          icon: "flag",
          label: t("Report Bug"),
          type: "link",
          action: () => setBugReportModalVisible(true),
        },
        {
          id: "contact",
          icon: "mail",
          label: t("Contact Us"),
          type: "link",
          action: handleContactUs,
        },
      ],
    },
    // {
    //   header: "Content",
    //   items: [
    //     { id: "save", icon: "save", label: t("Saved"), type: "link" },
    //     {
    //       id: "download",
    //       icon: "download",
    //       label: t("Downloads"),
    //       type: "link",
    //     },
    //   ],
    // },
  ];

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profile}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={styles.profileAvatarWrapper}>
              <Image
                style={styles.profileAvatar}
                source={{ uri: require("../assets/images/user.png") }}
              />{" "}
              <View style={styles.profileAction}>
                <FeatherIcon color="#fff" name="edit-3" size={15} />
              </View>
            </View>
          </TouchableOpacity>
          <Text style={styles.profileName}>{editProfileDetails.name}</Text>
          <Text style={styles.profileMailAddress}>
            {editProfileDetails.email}
          </Text>
        </View>

        {SECTIONS.map(({ header, items }) => (
          <View style={styles.section} key={header}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>{header}</Text>
            </View>
            <View style={styles.sectionBody}>
              {items.map(({ id, label, icon, type, action }, index) => (
                <View
                  key={id}
                  style={[
                    styles.rowWrapper,
                    index === 0 && { borderTopWidth: 0 },
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => {
                      if (type === "toggle" && id === "darkMode") {
                        () => toggleTheme();
                      } else if (type === "select" && id === "language") {
                        toggleLanguage();
                      } else if (action) {
                        action(); // Execute the associated action
                      }
                    }}
                  >
                    <View style={styles.row}>
                      <FeatherIcon
                        name={icon}
                        style={styles.rowIcon}
                        size={22}
                      />
                      <Text style={styles.rowLabel}>{label}</Text>
                      <View style={styles.rowSpacer} />
                      {type === "select" && id === "language" && (
                        <Text style={styles.rowValue}>
                          {isHebrew ? "Hebrew" : "English"}
                        </Text>
                      )}
                      {type === "toggle" && id === "darkMode" && (
                        <Switch
                          onValueChange={toggleTheme}
                          value={isDarkTheme}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      <UpdateProfile
        isVisible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
        details={editProfileDetails}
      />
      <BugReport
        isVisible={isBugReportModalVisible}
        onClose={() => setBugReportModalVisible(false)}
        onSubmit={(bugReportData) => {
          console.log(bugReportData); // Here you would handle the bug report submission
          setBugReportModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },
  header: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
  },
  /** Profile */
  profile: {
    padding: 24,
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  profileAvatarWrapper: {
    position: "relative",
  },
  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 9999,
  },
  profileAction: {
    position: "absolute",
    right: -4,
    bottom: -10,
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: "#007bff",
  },
  profileName: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: "600",
    color: "#414d63",
    textAlign: "center",
  },
  profileMailAddress: {
    marginTop: 5,
    fontSize: 16,
    color: "#989898",
    textAlign: "center",
  },
  /** Section */
  section: {
    paddingTop: 12,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#a7a7a7",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  sectionBody: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
  },
  /** Row */
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingRight: 24,
    height: 50,
  },
  rowWrapper: {
    paddingLeft: 24,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#e3e3e3",
  },
  rowIcon: {
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: "500",
    color: "#000",
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowValue: {
    fontSize: 17,
    color: "#616161",
    marginRight: 4,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Semi-transparent background
  },
});
