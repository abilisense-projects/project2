//Import React and Component
import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, StyleSheet, Image } from "react-native";

import { get, remove } from "../services/Storage";
import { jwtDecode } from "jwt-decode";

const Splash = ({ navigation }) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);
  // const navigation = useNavigation()
  useEffect(() => {
    setTimeout(async () => {
      setAnimating(false);

      const current_time = new Date();
      let islogin = await get("accessToken");
      if (islogin) {
        const decodedToken = jwtDecode(islogin);
        if (current_time.getTime() > decodedToken.exp * 1000) {
          await remove("accessToken");
          islogin = " ";
        }
      }

      const to = islogin ? "DrawerNavigationRoutes" : "Auth";
      navigation.navigate(to);
    }, 1800);
  }, []);

  return (
    <View style={styles.container}>
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
