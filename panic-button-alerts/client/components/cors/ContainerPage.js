import { useTheme } from "@react-navigation/native";
import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

export default function Container({ children }) {
    const { colors } = useTheme();

  return (
    // <ImageBackground source={require("../../assets/images/paper-texture-pink-pastel-background.jpg")} style={{width: '100%', height: '100%'} }>
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
          }}
    >
      {children}
    </View>
    // </ImageBackground>
  );
}
