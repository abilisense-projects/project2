
import { useTheme } from '@react-navigation/native';
import React from 'react';
import {View, Image, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the desired icon from react-native-vector-icons

const NavigationDrawerHeader = (props) => {
  const {colors} = useTheme()
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <Pressable onPress={toggleDrawer}>
      <Icon name="bars" size={20} color={colors.text} style={{ marginLeft: 5 }}  />
      </Pressable>
    </View>
  );
};
export default NavigationDrawerHeader;