import { Text, View, ScrollView, StyleSheet, TextInput, Button,  ImageBackground, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EmojiPicker from 'rn-emoji-keyboard'
import { database } from '../config/fb'
import { collection, addDoc } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import Gradient from '../img/gradient.jpg'
import Add2 from './Add2'
import { deleteCloudURL } from '../redux/actions';

export default function Add() {
    let dispatch = useDispatch();
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

  return (
    <ScrollView style={styles.scrollView}>
    <ImageBackground source={Gradient}
          style={{
            width: '100%', 
            minHeight: ScreenHeight,
            alignItems: 'center',
            paddingVertical: 10
          }}
        >
      <View style={styles.container}>
            <Text style={styles.title}>Add a new Product</Text>
            {/* <Text style={styles.emoji} onPress={() => setIsOpen(true)}>
                {newItem.emoji}
            </Text> */}
            <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
            {imagen? <Image style={styles.emoji} source={{uri:imagen}} /> : <Image style={styles.emoji} source={require('../../assets/images/default-placeholder.png')} />}
            </TouchableOpacity>
            <Text style={styles.buttonTextCamera} onPress={() => navigation.navigate('Camera')}>Take a picture</Text>
            <TextInput 
              onChangeText={(text) => setNewItem({...newItem, name: text, img: imagen})}
              placeholder='Porduct name'
              /* placeholderTextColor= 'white' */
              style={styles.inputContainer}
            />
            <TextInput 
              onChangeText={(text) => setNewItem({...newItem, price: text})}
              placeholder='$ Price'
              /* placeholderTextColor= 'white' */
              style={styles.inputContainer}
              keyboardType='number-pad'
            />
            <TextInput 
              onChangeText={(text) => setNewItem({...newItem, stock: text})}
              placeholder='Stock'
              /* placeholderTextColor= 'white' */
              style={styles.inputContainer}
              keyboardType='number-pad'
            />
            <TouchableOpacity style={styles.button} onPress={onSend}>
              <Text style={styles.buttonText}>Publish</Text>
            </TouchableOpacity>
      </View>
    </ImageBackground>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
      marginTop: 10,
      flex: 1,
      borderColor: 'white',
      borderWidth: 1,
      alignItems: 'center',
      width: '90%',
      borderRadius: 6,
      maxHeight: '90%',
      backgroundColor: 'white'

    },
    title: {
        marginTop: 5,
        fontSize: 32,
        fontWeight: '300',
    },
    inputContainer: {
        width: '90%',
        padding: 13,
        marginVertical: 6,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,

    },
    emoji: {
        width: 250,
        height: 250,
        borderRadius: 6,
        padding: 10,
        marginTop: 20,

    },
    button: {
        marginTop: 10,
        backgroundColor: '#0fa5e9',
        paddingVertical: 8,
        width: '90%',
        marginVertical: 6,
        borderRadius: 8,
        alignItems: 'center',

    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    buttonTextCamera:{
      color: '#0fa5e9',
      marginBottom: 20,
      marginTop: 5
    }



})

