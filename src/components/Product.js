import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { database } from '../config/fb'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { AntDesign } from '@expo/vector-icons'

export default function Product({ id, emoji, name, price, isSold }) {

    const onEdit = () => {
        const docRef = doc(database, 'products', id);
        updateDoc(docRef, {
            isSold: true,
        })
    }

    const onDelete = () => {
        const docRef = doc(database, 'products', id);
        deleteDoc(docRef)
    }

  return (
    <View style={styles.productContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.emoji}>{emoji}</Text>
            <AntDesign onPress={onDelete} name="delete"  size={26}/>
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>$ {price}</Text>
        {
        isSold ? 
            (<TouchableOpacity style={[styles.button, {backgroundColor: 'grey'}]}>
                <Text style={styles.buttonText}>Sold</Text>
            </TouchableOpacity>) 
            : 
            (<TouchableOpacity onPress={onEdit} style={styles.button}>
                <Text style={styles.buttonText}>Purchase</Text>
            </TouchableOpacity>)
        }
        
    </View>
  )
}

const styles = StyleSheet.create({
    productContainer: {
        padding: 16,
        backgroundColor: '#fff',
        margin: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'white',
    },
    emoji: {
        fontSize: 100
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold'
    },
    price: {
        fontSize: 20,
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