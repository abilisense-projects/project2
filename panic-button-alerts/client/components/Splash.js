//Import React and Component
import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, StyleSheet, Image } from "react-native";

import { get } from "./Storage";
import { useNavigation } from "@react-navigation/native";

const Splash = ({ navigation }) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);
  // const navigation = useNavigation()
  useEffect(() => {
    setTimeout(async () => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      const islogin = await get("accessToken");
      const to = islogin ? "DrawerNavigationRoutes" : "Auth";
      navigation.navigate(to);
    }, 1800);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/aboutreact.png")}
        style={{ width: "90%", resizeMode: "contain", margin: 30 }}
      />
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#AD40AF",
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
});
