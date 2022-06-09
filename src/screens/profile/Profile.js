import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../../redux/actions';
import { auth } from "../../config/fb";
import { signOut } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/Ionicons';
import { styles } from "./Styles";
import { cleanCurrentUser } from '../../redux/actions';

import React from 'react'

export default function Profile() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const theme = useSelector(state => state.theme)
    const user = useSelector(state => state.currentUser)

    const changeThemeApp = async() =>{
        dispatch(changeTheme())
    }
    const SignOut = () => {
      signOut(auth)
      .then(res=>{
        dispatch(cleanCurrentUser())
        console.log("log out", user)
        navigation.navigate('SignIn')
        
      })
      .catch(err=>{
          console.log(err)
      })
  }

  return (
    <View style={styles.container}>
        <MaterialCommunityIcons name={theme?"moon-outline":"sunny-outline"} onPress={changeThemeApp} style={theme?styles.changeTheme:styles.changeThemeDark}/>
        <TouchableOpacity onPress={SignOut}><Text style={{fontSize: 30, color: 'red'} }>Log out</Text></TouchableOpacity>
    </View>
  )
}

