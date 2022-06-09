import { StyleSheet, Text, View, Image, ImageBackground, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import Gradient from '../img/gradient.jpg';
import MaterialCommunityIcons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function ImageExpand(props) {
  const navigation = useNavigation();
  let ScreenHeight = Dimensions.get("window").height;
  return (
    <View style={{height: '100%',width: '100%',alignItems: 'center', justifyContent: 'center', backgroundColor: '#000'}}>
      <Image source={{uri: props.route.params.image }}
        style={{
          width: '100%',
          height: undefined,
          aspectRatio: 1,
        }}
      />
      <TouchableOpacity
        onPress={()=> navigation.navigate('Products')}
        style={styles.closeButton}
      >
        <MaterialCommunityIcons name="arrow-back-outline" style={styles.back} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: 45,
    left: 10,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1
  },
  back:{
    fontSize: 30,
    color: 'white'
  }
})