import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Button, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Dimensions  } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { database } from '../config/fb';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Product from '../components/Product';
import Gradient from '../img/gradient.jpg';



export default function Home() {
    const navigation = useNavigation();
    const [products, setProducts] = useState([]);
    let ScreenHeight = Dimensions.get("window").height;

    useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => <TouchableOpacity  style={styles.button} onPress={() => navigation.navigate('Add')}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>,
      })
    }, [])

    useEffect(() => {
      const collectionRef = collection(database, 'products');
      const q = query(collectionRef, orderBy('createAt', 'desc'));

      const unsuscribe = onSnapshot(q, querySnapshot => {
        setProducts(
          querySnapshot.docs.map(doc => ({
            id: doc.id,
            emoji: doc.data().emoji,
            name: doc.data().name,
            price: doc.data().price,
            isSold: doc.data().isSold,
            stock: doc.data().stock,
            createAt: doc.data().createAt
          }))
        )
      })

      return unsuscribe

    },[])
  return (
      <ScrollView style={styles.container}> 
        <ImageBackground source={Gradient}
          style={{
            width: '100%', 
            minHeight: ScreenHeight,

          }}
        >
          {/* <Text style={styles.title}>Products</Text> */}
          {products.map(p => <Product key={p.id} {...p}/>)}
        </ImageBackground>
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    margin: 16,
    color: 'white'
  },
  button: {
    backgroundColor: '#0fa5e9',
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginTop: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff'
  }
})
