import React, { useState, useEffect, useLayoutEffect, useContext } from 'react'
import { Button, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Switch } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { database } from '../../config/fb';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Product from '../../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './Styles';



export default function Home() {
  const navigation = useNavigation();
  const userUid = useSelector(state => state.currentUser)
  let dispatch = useDispatch();
  const theme = useSelector(state => state.theme)
  const [products, setProducts] = useState([]);
  const [mode,setMode] = useState(false)
  let ScreenHeight = Dimensions.get("window").height;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <TouchableOpacity  style={styles.button} onPress={() => navigation.navigate('Add')}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>,
    })
  }, [])

  useEffect(() => {
    const collectionRef = collection(database, `${userUid}`);
    const q = query(collectionRef, orderBy('createAt', 'desc'));

    const unsuscribe = onSnapshot(q, querySnapshot => {
      setProducts(
        querySnapshot.docs.map(doc => ({
          id: doc.id,
          img: doc.data().img,
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
      <ScrollView style={theme?styles.container : styles.containerDark}> 
          {products.map(p => <Product key={p.id} {...p}/>)}
      </ScrollView>
  )
}

