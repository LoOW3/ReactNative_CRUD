import React, { useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button, Image, } from 'react-native'
import { database } from '../config/fb'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { AntDesign } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';

export default function Product({ id, img, name, price, isSold, stock}) {
    const navigation = useNavigation();
    const [q, setQ] = useState(1)
    const [total,setTotal] = useState('')
    const onEdit = () => {
        const docRef = doc(database, 'products', id);
        updateDoc(docRef, {
            stock: stock - q
        })
        setQ(1)
    }

    const onDelete = () => {
        const docRef = doc(database, 'products', id);
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
    <View style={styles.productContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={() => navigation.navigate("Image", {image: img})}><Image style={styles.emoji}  source={{uri:img}}/></TouchableOpacity>
            <AntDesign onPress={onDelete} name="delete"  size={26}/>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between'}}>
            <View>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.price}>$ {price}</Text>
                <Text style={styles.stock}>Stock: {stock? stock : 0}ud</Text>
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
                    <Text style={styles.total}>Total: ${price * q}</Text>
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
        borderWidth: 1,
        borderColor: 'white',
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
    price: {
        fontSize: 20,
        color: 'gray'
    },
    stock: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'grey'
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
    }
})