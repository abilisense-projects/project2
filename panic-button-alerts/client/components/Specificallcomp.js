import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, FlatList, Image,Text } from "react-native";

export default function Specificall() {
    useEffect(() => {
       

    }, []);
    
    return (
        <View style={styles.container}>
            <Text style={styles.text}>קריאה ספציפית</Text>
            
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      height:'30%',
      width: '50%',
      backgroundColor:'blue'
    },
    text: {
        fontSize: 'large',
        color: 'white'
    },
  })