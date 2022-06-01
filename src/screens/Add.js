import { Text, View, StyleSheet, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import EmojiPicker from 'rn-emoji-keyboard'
import { database } from '../config/fb'
import { collection, addDoc } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'

export default function Add() {
    const navigation = useNavigation();
    const [isOpen, setIsOpen] = useState(false)
    const [newItem, setNewItem] = useState({
        emoji: '😀',
        name: '',
        price: 0,
        isSold: false,
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
    <View style={styles.container}>
      <Text style={styles.title}>Sell a new Product</Text>
      <Text style={styles.emoji} onPress={() => setIsOpen(true)}>
          {newItem.emoji}
      </Text>
      <EmojiPicker 
        onEmojiSelected={handlePick}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <TextInput 
        onChangeText={(text) => setNewItem({...newItem, name: text})}
        placeholder='Porduct name'
        style={styles.inputContainer}
      />
      <TextInput 
        onChangeText={(text) => setNewItem({...newItem, price: text})}
        placeholder='$ Price'
        style={styles.inputContainer}
        keyboardType='number-pad'
      />
      <Button title='Publish' onPress={onSend} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingVertical: 10
    },
    title: {
        fontSize: 32,
        fontWeight: '700'
    },
    inputContainer: {
        width: '90%',
        padding: 13,
        marginVertical: 6,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6
    },
    emoji: {
        fontSize: 100,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        padding: 10,
        marginVertical: 6,

    }


})

