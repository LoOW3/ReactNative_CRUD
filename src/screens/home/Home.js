import React, { useState, useEffect, useLayoutEffect, useContext } from 'react'
import { Button, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Switch, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { database } from '../../config/fb';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Product from '../../components/Product';
import CategorySelect from '../../components/CategorySelect';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './Styles';



export default function Home() {
  const navigation = useNavigation();
  const userUid = useSelector(state => state.currentUser)
  let dispatch = useDispatch();
  const theme = useSelector(state => state.theme);
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([])
  const [categories, setCategories] = useState([]);

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
          category: doc.data().category,
          createAt: doc.data().createAt
        }))
        )
      setFiltered(
        querySnapshot.docs.map(doc => ({
          id: doc.id,
          img: doc.data().img,
          name: doc.data().name,
          price: doc.data().price,
          isSold: doc.data().isSold,
          stock: doc.data().stock,
          category: doc.data().category,
          createAt: doc.data().createAt
        }))
        )
      })
    return unsuscribe
  },[])
  useEffect(() => {
    const collectionRef = collection(database, 'categories');
    const q = query(collectionRef);
    const unsuscribe = onSnapshot(q, querySnapshot => {
      setCategories(
         querySnapshot.docs.map(doc =>({
          name: doc.data().categories
         }))

         )
        })
        
        return unsuscribe
        
      },[])

  return (
    <View style={{height: '100%', width: '100%'}}>
      <ScrollView style={theme?styles.container : styles.containerDark}>
        <ScrollView style={{height: 45, marginTop: 10,}} horizontal={true} contentContainerStyle={{alignItems: 'center'}} showsHorizontalScrollIndicator={false}>
          {categories[0]? categories[0].name.map(c => <CategorySelect name={c} key={c} setFiltered={setFiltered} filtered={filtered} products={products}/>): <></>}
        </ScrollView>
        
        {filtered.length === 0? 
          <View style={{width: '100%', height: 500, alignItems: 'center', justifyContent: 'center',}}>
            {products.length?
              <Text style={theme?{fontSize:20, color: 'black' }:{fontSize:20, color: 'white' }}>No hay productos {':('}</Text>
              :
              <Text style={theme?{fontSize:20, color: 'black' }:{fontSize:20, color: 'white' }}>Cargando...</Text>
            }
          </View>
          : 
          filtered.map(p => <Product key={p.id} {...p}/>)
        }
        
      </ScrollView>
        {filtered.length < products.length? <TouchableOpacity style={theme?styles.showProducts: styles.showProductsDark} onPress={() => setFiltered(products)} ><Text style={{color: '#0fa5e9', fontSize: 18}}>Show all products</Text></TouchableOpacity> : <></>}
      </View>
  )
}

