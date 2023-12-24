import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, TouchableOpacity, Text, View, Pressable, } from 'react-native';
import axios from '../../services/axiosInstance';
import ReactiveButton from 'reactive-button';

export default function Btns() {
    const [state, setState] = useState('success');

    const onClickHandler = () => {
        setState('loading');
        setTimeout(() => {
            setState('success');
        }, 2000);
    }

    return (
        <ReactiveButton
            buttonState={state}
            onClick={onClickHandler}
            color={'prmary'}
            idleText={'High'}
            loadingText={'Loading'}
            successText={'Success'}
            errorText={'Error'}
            type={'button'}
            className={'class1 class2'}
            style={{ borderRadius: '5px' }}
            outline={false}
            shadow={false}
            rounded={false}
            size={'normal'}
            block={false}
            messageDuration={2000}
            disabled={false}
            buttonRef={null}
            height={null}
            width={'25%'} 
            animation={true}
            background-color={"--reactive-button-red-colo"}
            margin-top={'10%'}
        />
        
    );
}

