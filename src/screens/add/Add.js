import { Text, View, ScrollView, StyleSheet, TextInput, Button,  ImageBackground, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { database } from '../../config/fb'
import { collection, addDoc } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { deleteCloudURL } from '../../redux/actions';
import { styles } from './Styles';

export default function Add() {
    let dispatch = useDispatch();
    const theme = useSelector(state => state.theme)
    let imagen = useSelector((state) => state.cloudURL);
    const navigation = useNavigation();
    const [isOpen, setIsOpen] = useState(false);
    let ScreenHeight = Dimensions.get("window").height;
    const [newItem, setNewItem] = useState({
        img: '',
        name: '',
        price: 0,
        isSold: false,
        stock: 0,
        createAt: new Date()
    })

    const onSend = async() =>{
        await addDoc(collection(database, 'products'), newItem);
        navigation.goBack();
        dispatch(deleteCloudURL())
    }
/*     useEffect(() => {
      navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" }});
      return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    }, [navigation]); */

  return (
    <ScrollView style={theme?{backgroundColor: '#f6f2fc',
            width: '100%', 
            paddingVertical: 10} : 
            {backgroundColor: '#000'
            ,width: '100%', 
            paddingVertical: 10,
            }} contentContainerStyle={{alignItems: 'center'}}>

      <View style={theme?styles.container : styles.containerDark}>
            <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
            {imagen? 
                <Image style={styles.emoji} source={{uri:imagen}} /> : 
                <Image style={styles.emoji} source={theme?require('../../../assets/images/default-placeholder.png') : require('../../../assets/images/image.png')} />}
            </TouchableOpacity>
            <Text style={styles.buttonTextCamera} onPress={() => navigation.navigate('Camera')}>Take a picture</Text>
            <TextInput 
              onChangeText={(text) => setNewItem({...newItem, name: text, img: imagen})}
              placeholder='Porduct name'
              placeholderTextColor='#999'
              style={theme?styles.inputContainer : styles.inputContainerDark}
            />
            <TextInput 
              onChangeText={(text) => setNewItem({...newItem, price: text})}
              placeholder='$ Price'
              placeholderTextColor='#999'
              style={theme?styles.inputContainer : styles.inputContainerDark}
              keyboardType='number-pad'
            />
            <TextInput 
              onChangeText={(text) => setNewItem({...newItem, stock: text})}
              placeholder='Stock'
              placeholderTextColor={theme?'#999': '#999' }
              style={theme?styles.inputContainer : styles.inputContainerDark}
              keyboardType='number-pad'
            />
            <TouchableOpacity style={styles.button} onPress={onSend}>
              <Text style={styles.buttonText}>Publish</Text>
            </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
