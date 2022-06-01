import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Button, Text, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { database } from '../config/fb';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Product from '../components/Product';



export default function Home() {
    const navigation = useNavigation();
    const [products, setProducts] = useState([]);

    useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => <Button title='add' onPress={() => navigation.navigate('Add')}/>
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
            createAt: doc.data().createAt
          }))
        )
      })

      return unsuscribe

    },[])
  return (
      <View style={styles.container}> 
      <Text style={styles.title}>Products</Text>
      {products.map(p => <Product key={p.id} {...p}/>)}
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroudColor: '#f5f3f9'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    margin: 16
  }

})
