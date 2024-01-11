import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, Alert } from 'react-native';


//Import assets


const Snackbar = ({
  position = 'Bottom',
  header,
  message,
  snackBarType,
  duration = 60000,
  actionLabel,
  onActionPress,
  onDismissSnackbar,
  isPermanent = false,
}) => {
  console.log('snack',header,message,snackBarType,
  duration,
  actionLabel,
  onActionPress,
  onDismissSnackbar,
  isPermanent);
  
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const fadeAnim = useState<Animated.Value>(new Animated.Value(0))[0];

  useEffect(() => {
    showSnackbar();
  }, []);

  const showSnackbar = () => {
    setIsVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (!isPermanent) {
        console.log("Snackbar")
        setTimeout(() => {
          hideSnackbar();
        }, duration);
      }

    });
  };

  const hideSnackbar = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsVisible(false);
      onDismissSnackbar?.();
    });
  };

  const handleActionPress = () => {
    hideSnackbar();
    onActionPress?.();
  };

  let icon;
  switch (snackBarType) {
    case 'Success':
      icon = <images.TaskSubmitSuccess />;
      break;
    case 'Failure':
      icon = <images.Cancelcon />;
      break;
    case 'Offline':
      icon = <images.Offline />;
      break;
    default:
      break;
  }

  return isVisible ? (
    <Animated.View
      style={[
        SnackBarStyle.SnackbarContainer,
        SnackBarStyle[position],
        SnackBarStyle[snackBarType],
        { opacity: fadeAnim },
      ]}>
      <View style={SnackBarStyle.SnackbarContentContainer}>
        <View style={SnackBarStyle.IconAndMessageContainer}> 
          {icon}
          <View style={SnackBarStyle.MessageContainer}>
            {header && <Text style={SnackBarStyle.HeaderStyle}>{header}</Text>}
            <Text style={SnackBarStyle.MessageText}>{message}</Text>
          </View>
        </View>
        {actionLabel && (
          <TouchableOpacity onPress={handleActionPress}>
            <Text style={SnackBarStyle.ActionLabel}>{actionLabel}</Text>
          </TouchableOpacity>
        )} 
      </View>
    </Animated.View>
  ) : null;
};

//Specifies the default props
Snackbar.defaultProps = {
  actionLabel: null,
};

export default Snackbar;
import {Dimensions, StyleSheet} from 'react-native';
import {
  fontPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
} from './meteics';

export const SnackBarStyle = StyleSheet.create({
  SnackbarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    paddingHorizontal: pixelSizeHorizontal(12),
    paddingVertical: pixelSizeVertical(16),
    marginHorizontal: pixelSizeHorizontal(16),
    marginVertical: pixelSizeVertical(16),
    borderRadius: 3,
    width: Dimensions.get('screen').width - pixelSizeHorizontal(32),
  },
  Top: {
    top: 0,
  },
  Bottom: {
    bottom: 0,
  },
  NotificationWithoutIcon: {
    backgroundColor: '#1f243d',
  },
  Success: {
    backgroundColor: '#00C282',
  },
  Failure: {
    backgroundColor:  '#fe6c6a',
  },
  Notification: {
    backgroundColor: '#1f243d',
  },
  SnackbarContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Offline: {
    backgroundColor: '#fe6c6a',
  },
  IconAndMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 0.9,
  },
  MessageContainer: {
    flex: 0.95,
  },
  HeaderStyle: {
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    fontSize: fontPixel(18),
    marginBottom: pixelSizeVertical(9),
  },
  MessageText: {
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    fontSize: fontPixel(16),
  },
  ActionLabel: {
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    fontSize: fontPixel(16),
  },
});