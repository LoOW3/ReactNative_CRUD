import React, { useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button, Image, } from 'react-native'
import { database } from '../config/fb'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'

import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons'

export default function Product({ id, img, name, price, isSold, stock }) {
    const theme = useSelector(state => state.theme)
    const userUid = useSelector(state => state.currentUser)
    const navigation = useNavigation();
    const [q, setQ] = useState(1)
    const [total,setTotal] = useState('')
    const onEdit = () => {
        const docRef = doc(database, `${userUid}`, id);
        updateDoc(docRef, {
            stock: stock - q
        })
        setQ(1)
    }

    const onDelete = () => {
        const docRef = doc(database, `${userUid}`, id);
        deleteDoc(docRef)
    }
    const [loaded] = useFonts({
        PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
        PoppinsRegular: require('../../assets/fonts/Poppins-Regular.ttf')
      });

    function sumQ(){
        if(q < stock) setQ(q + 1)
    }
    function restQ(){
        if(q > 1) setQ(q - 1)
    }
  return (
    <View style={theme?styles.productContainer: styles.productContainerDark}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={() => navigation.navigate("Image", {image: img})}><Image style={styles.emoji}  source={{uri:img}}/></TouchableOpacity>
            <Icon onPress={onDelete} style={theme?{color: 'black'} : {color: '#e1e1e1'}} name="trash-outline"  size={26}/>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between'}}>
            <View>
                <Text style={theme?styles.name: styles.nameDark}>{name}</Text>
                <Text style={theme?styles.price: styles.priceDark}>$ {price}</Text>
                <Text style={theme?styles.stock: styles.stockDark}>Stock: {stock? stock : 0}ud</Text>
            </View>
            <View style= {{alignItems: 'center'}}>
                <View style={styles.containerQuatity}>
                    <TouchableOpacity  title='-' style={styles.moreLess} onPress={restQ}>
                        <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>
                    <View style={{width: 10}}></View>
                    <TouchableOpacity  title='+' style={styles.moreLess} onPress={sumQ}>
                        <Text style={styles.buttonText} >+</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={theme?styles.total: styles.totalDark}>Total: ${price * q}</Text>
                </View>
            </View>
        </View>
        {
        isSold || !stock ? 
            (<TouchableOpacity style={[styles.button, {backgroundColor: 'grey'}]}>
                <Text style={styles.buttonText}>Sold</Text>
            </TouchableOpacity>) 
            : 
            (<TouchableOpacity onPress={onEdit} style={styles.button}>
                <Text style={styles.buttonText}>Sell {q === 1? '': `x${q}`}</Text>
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
    },
    productContainerDark: {
        padding: 16,
        backgroundColor: '#141414',
        margin: 16,
        borderRadius: 8,
    },
    emoji: {
        width: 100,
        height: 100,
        borderRadius: 8
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold'
    },
    nameDark: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#e1e1e1'
    },
    price: {
        fontSize: 20,
        color: 'gray'
    },
    priceDark: {
        fontSize: 20,
        color: '#999'
    },
    stock: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'grey'
    },
    stockDark: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#999'
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
    },
    containerQuatity: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        height: 40
    },
    moreLess: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 2,
        paddingHorizontal: 20,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#0fa5e9',
    },
    total: {
        marginTop: 5,
        color: 'grey'
    },
    totalDark: {
        marginTop: 5,
        color: '#999'
    }
})