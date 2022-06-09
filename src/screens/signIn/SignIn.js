import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native'
import React, {useState, useLayoutEffect}from 'react'
import { auth } from "../../config/fb";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { styles } from './Styles'

export default function SignIn() {  
    const navigation = useNavigation();
    const theme = useSelector(state => state.theme)
    const [isSignedIn, setIsSignedIn] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const [error, setError] = useState({
        email: '',
        password: '',
        repeatPassword: ''
    })
    const [register, setRegister] = useState(false)

    const RegisterUser = () =>{      

        createUserWithEmailAndPassword(auth, email, password)
        .then(res => {
            console.log(res)
            setIsSignedIn(true)
        })
        .catch(err=>{
            console.log(err)
        })


    }
    const LogIn = () =>{

        signInWithEmailAndPassword(auth, email, password)
        .then(res => {
            console.log(res.user.uid)
            setIsSignedIn(true)
            
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const SignOut = () => {
        signOut(auth)
        .then(res=>{
            setIsSignedIn(false)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => <TouchableOpacity   onPress={() => navigation.navigate('App')}>
            <Text style={styles.buttonText}>App</Text>
          </TouchableOpacity>,
        })
      }, [])

  return (
    <View style={theme?styles.supremeContainer:styles.supremeContainerDark}>
            
        {register?
            <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center'}}>
                <Text style={theme?styles.title2:styles.title2Dark}>Create your account</Text>
                <TextInput placeholder='Email' value={email} placeholderTextColor='#999'style={theme?styles.textInput:styles.textInputDark}/>
                {error.email?<Text style={styles.errorText}>{error.email}</Text>:<Text> </Text>}
                <TextInput placeholder='Password' value={password} placeholderTextColor='#999' secureTextEntry={true} style={theme?styles.textInput:styles.textInputDark}/>
                <Text></Text>
                <TextInput placeholder='Repeat your password' placeholderTextColor='#999' secureTextEntry={true} onChangeText={text => setError({...error, password: text})} style={theme?styles.textInput:styles.textInputDark}/>
                {error.repeatPassword?<Text style={styles.errorText}>{error.repeatPassword}</Text>:<Text> </Text>}
                <TouchableOpacity style={styles.button} onPress={RegisterUser}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
                <View>
                    <Text style={theme?styles.downText: styles.downTextDark} >Do you have an account? <Text style={styles.createAccount} onPress={() => setRegister(false)}>Log in</Text></Text>
                </View>
            </ScrollView>
            :
            <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center'}}>
                <Text style={theme?styles.title:styles.titleDark}>Welcome back!</Text>
                <TextInput placeholder='Email' value={email} placeholderTextColor='#999'style={theme?styles.textInput:styles.textInputDark}/>
                {error.email?<Text style={styles.errorText}>{error.email}</Text>:<Text> </Text>}
                <TextInput placeholder='Password' value={password} placeholderTextColor='#999' secureTextEntry={true} style={theme?styles.textInput:styles.textInputDark}/>
                {error.password?<Text style={styles.errorText}>{error.password}</Text>:<Text> </Text>}
                <TouchableOpacity style={styles.button} onPress={LogIn}>
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>
                <View>
                    <Text style={theme?styles.downText: styles.downTextDark}>Don't have an account? <Text style={styles.createAccount} onPress={() => setRegister(true)}>Create one!</Text></Text>
                </View>
            </ScrollView>
        }
    </View>
  )
}

{/*      <TextInput placeholder='Email' value={email} onChangeText={text => setEmail(text)}/>
     <TextInput placeholder='Password'value={password} secureTextEntry={true} onChangeText={text => setpassword(text)}/>
     {isSignedIn? <Button title='SignOut' onPress={SignOut}/>:
       <Button title='SignIn' onPress={SignIn}/>
     } */}