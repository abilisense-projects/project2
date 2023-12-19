// import React, { useState, useEffect } from 'react'
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Image, TouchableOpacity, Text, View, Pressable, } from 'react-native';
// import axios from '../../services/axiosInstance';
// import ReactiveButton from 'reactive-button';

// export default function Btns() {
//     const [state, setState] = useState('success');

//     const onClickHandler = () => {
//         setState('loading');
//         setTimeout(() => {
//             setState('success');
//         }, 2000);
//     }

//     return (
//         <ReactiveButton
//             buttonState={state}
//             onClick={onClickHandler}
//             color={'prmary'}
//             idleText={'High'}
//             loadingText={'Loading'}
//             successText={'Success'}
//             errorText={'Error'}
//             type={'button'}
//             className={'class1 class2'}
//             style={{ borderRadius: '5px' }}
//             outline={false}
//             shadow={false}
//             rounded={false}
//             size={'normal'}
//             block={false}
//             messageDuration={2000}
//             disabled={false}
//             buttonRef={null}
//             height={null}
//             width={'25%'} 
//             animation={true}
//             background-color={"--reactive-button-red-colo"}
//             margin-top={'10%'}
//         />

//     );
// }
import React from "react";
import { View, SafeAreaView, StyleSheet, Text } from "react-native";

function Button({ backgroundColor = 'tomato', children }) {
    return (
        <View
            style={[
                styles.button,
                {
                    height: 80,
                    width: 250,
                    backgroundColor,
                },
            ]}>
            <Text style={{ fontSize: 30 }}>{children}</Text>
        </View>
    );
}

function Btns() {
    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScaleAnimation onPress={() => { }} disabled={false} scaleTo={0.97}>
                <Button backgroundColor="#7ab2c9">Button</Button>
            </ScaleAnimation>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        borderRadius: 25,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,
    },
});

export default Btns
