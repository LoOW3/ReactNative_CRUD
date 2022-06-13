import { Text, View, ScrollView, StyleSheet, TextInput, Button,  ImageBackground, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import {Picker} from '@react-native-picker/picker';
import { useSelector, useDispatch } from 'react-redux';
import { database } from '../../config/fb'
import { collection, addDoc } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { deleteCloudURL } from '../../redux/actions';
import { styles } from './Styles';

export default function Add() {
    let dispatch = useDispatch();
    const ref_input2 = useRef();
    const ref_input3 = useRef();
    const theme = useSelector(state => state.theme)
    let imagen = useSelector((state) => state.cloudURL);
    const userUid = useSelector(state => state.currentUser);
    const navigation = useNavigation();
    const [isOpen, setIsOpen] = useState(false);
    const [category, setCategory] = useState('');
    let ScreenHeight = Dimensions.get("window").height;
    const [newItem, setNewItem] = useState({
        img: '',
        name: '',
        price: 0,
        isSold: false,
        stock: 0,
        category: '',
        createAt: new Date()
    })

    const onSend = async() =>{
        await addDoc(collection(database, `${userUid}`), newItem);
        navigation.goBack();
        dispatch(deleteCloudURL())
    }
    useEffect(() => {
      navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" }});
      return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    }, [navigation]);
  return (
    <ScrollView style={theme?{backgroundColor: 'white',
            width: '100%', 
            paddingVertical: 0} : 
            {backgroundColor: '#000'
            ,width: '100%', 
            paddingVertical: 0,
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
              onSubmitEditing={() => ref_input2.current.focus()}
              blurOnSubmit={false}
            />
            <TextInput 
              onChangeText={(text) => setNewItem({...newItem, price: text})}
              placeholder='$ Price'
              placeholderTextColor='#999'
              style={theme?styles.inputContainer : styles.inputContainerDark}
              keyboardType='number-pad'
              onSubmitEditing={() => ref_input3.current.focus()}
              ref={ref_input2}
              blurOnSubmit={false}
            />
            <TextInput 
              onChangeText={(text) => setNewItem({...newItem, stock: text})}
              placeholder='Stock'
              placeholderTextColor={theme?'#999': '#999' }
              style={theme?styles.inputContainer : styles.inputContainerDark}
              keyboardType='number-pad'
              ref={ref_input3}
            />
              <Picker
                selectedValue={newItem.category}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) =>{
                  if(itemValue != 0) setNewItem({...newItem, category: itemValue})}
                }>
                <Picker.Item  label="Category..." value="0" />
                <Picker.Item  label="Electronica" value="Electronica" />
                <Picker.Item  label="Mascotas" value="Mascotas" />
                <Picker.Item  label="Bebidas" value="Bebidas" />
                <Picker.Item  label="Comida" value="Comida" />
                <Picker.Item  label="Art Limpieza" value="Art Limpieza" />
                <Picker.Item  label="Lacteos" value="Lacteos" />
              </Picker>
            <TouchableOpacity style={styles.button} onPress={onSend}>
              <Text style={styles.buttonText}>Publish</Text>
            </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
