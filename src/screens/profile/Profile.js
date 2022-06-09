import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../../redux/actions';
import MaterialCommunityIcons from 'react-native-vector-icons/Ionicons';
import { styles } from "./Styles";

import React from 'react'

export default function Profile() {
    const dispatch = useDispatch();
    const theme = useSelector(state => state.theme)

    const changeThemeApp = async() =>{
        dispatch(changeTheme())
    }

  return (
    <View style={styles.container}>
        <MaterialCommunityIcons name={theme?"moon-outline":"sunny-outline"} onPress={changeThemeApp} style={theme?styles.changeTheme:styles.changeThemeDark}/>
    </View>
  )
}

