import React, { useEffect } from 'react'
import { BackHandler } from 'react-native';

export default function HandleBack(props){
    useEffect(() => {
        const backAction = () => {
           return true
        };
    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    
        return () => backHandler.remove();
      }, []);
    return props.children
}
