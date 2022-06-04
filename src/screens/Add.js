import { Text, View, ScrollView, StyleSheet, TextInput, Button,  ImageBackground, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import EmojiPicker from 'rn-emoji-keyboard'
import { database } from '../config/fb'
import { collection, addDoc } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import Gradient from '../img/gradient.jpg'
import Add2 from './Add2'

export default function Add() {
    const navigation = useNavigation();
    const [isOpen, setIsOpen] = useState(false);
    let ScreenHeight = Dimensions.get("window").height;
    const [newItem, setNewItem] = useState({
        emoji: '🍩',
        name: '',
        price: 0,
        isSold: false,
        stock: 0,
        createAt: new Date()
    })

    const onSend = async() =>{
        await addDoc(collection(database, 'products'), newItem);
        navigation.goBack();
    }

    const handlePick = (EmojiObject) => {
        setNewItem({
            ...newItem,
            emoji: EmojiObject.emoji
        })
    };
    

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
            <Text style={styles.emoji} onPress={() => setIsOpen(true)}>
                {newItem.emoji}
            </Text>
            <TouchableOpacity  style={styles.button} onPress={() => navigation.navigate('Camera')}>
              <Text style={styles.buttonText}>Take a picture</Text>
            </TouchableOpacity>
            <EmojiPicker 
              onEmojiSelected={handlePick}
              open={isOpen}
              onClose={() => setIsOpen(false)}
            />
            <TextInput 
              onChangeText={(text) => setNewItem({...newItem, name: text})}
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
      marginTop: 60,
      flex: 1,
      borderColor: 'white',
      borderWidth: 1,
      alignItems: 'center',
      width: '90%',
      borderRadius: 6,
      maxHeight: '69%',
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
        fontSize: 100,
        borderRadius: 6,
        padding: 10,
        marginVertical: 6,

    },
    button: {
        marginTop: 30,
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



})

