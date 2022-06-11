import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Button, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../../redux/actions';
import { auth } from "../../config/fb";
import { signOut } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/Ionicons';
import { styles } from "./Styles";
import { cleanCurrentUser } from '../../redux/actions';
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/Ionicons'

import React, { useState } from 'react'
import { Avatar } from 'react-native-paper';

export default function Profile() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const theme = useSelector(state => state.theme)
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const [userAuth, setUserAuth] = useState(currentUser.displayName)
  const [editInfo,setEditInfo] = useState({
        name: currentUser.displayName,
        image: null
      })
  const [onEdit, setOnEdit] = useState(false)
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    /* console.log('PICK IMAGE')
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
    });
    console.log(result.uri)
    if(result.uri){
      
    let base64Img = `data:image/jpg;base64,${result.uri}`;
      let apiUrl =
        'https://api.cloudinary.com/v1_1/ignaciodiaz12/image/upload';
      let data = {
        file: base64Img,
        upload_preset: 'reactnativecrud'
      };

      fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST'
      })
        .then(async response => {
          let data = await response.json();
          if (data.secure_url) {
            console.log('SE SUBIO LA IMAGEN')
            setEditInfo(data.secure_url)
          }
        })
        .catch(err => {
          alert('Cannot upload');
        });

      }
      else{
        console.log('NO ENTRO PA SUBIRSE A CLOUD')
      } */
  };
  const changeThemeApp = async() =>{
      dispatch(changeTheme())
  }
  const submitName = async(name) =>{
      setUserAuth(name)
      updateProfile(auth.currentUser, {
        displayName: name
      }).then(() => {
        
      }).catch((error) => {
        console.log(error)
        // ...
      });
  } 

  onAuthStateChanged(auth, (user) => {
    if (user) {

  }})
  const SignOut = () => {
    signOut(auth)
    .then(res=>{
      dispatch(cleanCurrentUser())
      navigation.navigate('SignIn')
      
    })
    .catch(err=>{
        console.log(err)
    })
  }
  return (
    <View style={styles.container}>
      <View style={styles.infoUser}>
        <View style={styles.photo}>
          {
            onEdit?
            <TouchableOpacity onPress={pickImage} >
              <Avatar.Image
              source={currentUser.photoURL === null? require('../../../assets/images/defaultAvatar.png') : {uri: currentUser.photoURL}}
              size={90} /> 
            </TouchableOpacity>:
            <Avatar.Image
            source={currentUser.photoURL === null? require('../../../assets/images/defaultAvatar.png') : {uri: currentUser.photoURL}}
            size={90} />
          }
        </View>
        <View style={styles.nameEmail}>
          {
            onEdit?
            <View style={{flexDirection:'row', alignItems: 'flex-end'}}><TextInput style={styles.titleEdit} value={editInfo.name} onChangeText={(text) => setEditInfo({...editInfo ,name: text})}/>
              <Icon name='pencil-outline' color={'#999'} size={25} style={{paddingLeft: 5}}/></View> : 
            <Text style={styles.title}>{userAuth}</Text>
          }
          <Text style={styles.caption}>{currentUser.email}</Text>
          {
            onEdit?
            <Text style={styles.edit} onPress={() => [setOnEdit(!onEdit), submitName(editInfo.name)]}>Save changes</Text>:
            <Text style={styles.edit} onPress={() => setOnEdit(!onEdit)}>Edit profile</Text>
          }
        </View>
      </View>
      <ScrollView style={styles.basket}>

      </ScrollView>
    </View>
  )
}


/*       <View>

        <TextInput value={name} onChangeText={text => setName(text)} placeholder='nombre...' style={{width: '90%', height: 30}}/>
        <TouchableOpacity onPress={() => submitName(name)}><Text>Update name</Text></TouchableOpacity>
      </View>
        <MaterialCommunityIcons name={theme?"moon-outline":"sunny-outline"} onPress={changeThemeApp} style={theme?styles.changeTheme:styles.changeThemeDark}/>
        <TouchableOpacity onPress={SignOut}><Text style={{fontSize: 30, color: 'red'} }>Log out</Text></TouchableOpacity> */