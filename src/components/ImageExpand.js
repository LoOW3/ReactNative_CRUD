import { StyleSheet, Text, View, Image, ImageBackground, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import Gradient from '../img/gradient.jpg';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ImageExpand(props) {
  const navigation = useNavigation();
  let ScreenHeight = Dimensions.get("window").height;
  return (
    <View style={{height: '100%',width: '100%',alignItems: 'center', justifyContent: 'center', backgroundColor: '#000'}}>
      <Image source={{uri: props.route.params.image }}
        style={{
          width: '90%', 
          height: '90%',
          borderRadius: 10
        }}
      />
      <TouchableOpacity
        onPress={()=> navigation.navigate('Products')}
        style={styles.closeButton}
      >
        <AntDesign name='close' size={15} color='#fff' />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: 45,
    right: 25,
    height: 30,
    width: 30,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF0000',
    opacity: 1
  },
})