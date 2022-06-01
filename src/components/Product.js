import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { database } from '../config/fb'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { AntDesing } from '@expo/vector-icons'

export default function Product({ id, emoji, name, price, isSold }) {
  return (
    <View style={styles.productContainer}>
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>{price}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    productContainer: {
        padding: 16,
        backgroundColor: '#fff',
        margin: 16,
        borderRadius: 8
    },
    emoji: {
        fontSize: 100
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold'
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'gray'
    },
    button: {
        backgroundColor: '#0fa5e9',
        padding: 10,
        marginVertical: 6,
        borderRadius: 8,
        alignItems: 'center',

    },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff'
    }
})