import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

export default function CategorySelect({name}) {
    const theme = useSelector(state => state.theme)
  return (
    <TouchableOpacity style={theme?styles.container : styles.containerDark}>
      <Text style={theme?styles.text : styles.textDark}>{name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        paddingHorizontal: 15,
        marginHorizontal: 5,
        borderRadius: 30,
        backgroundColor: '#0fa5e9',
        alignItems:'center',
        justifyContent: 'center'
    },
    containerDark: {
        height: 40,
        paddingHorizontal: 15,
        marginHorizontal: 5,
        borderRadius: 30,
        backgroundColor: '#0fa5e9',
        alignItems:'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 15,
        color: 'white'
    },
    textDark: {
        fontSize: 15,
        color: 'white'
    }

})