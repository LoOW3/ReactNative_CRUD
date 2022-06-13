import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, {useState, useLayoutEffect, useRef}from 'react'
import { auth } from "../../config/fb";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './Styles'
import { currentUser } from '../../redux/actions';

export default function SignIn() {  
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const ref_input2 = useRef();
    const ref_input3 = useRef();
    const theme = useSelector(state => state.theme);
    const signIn = useSelector(state=> state.currentUser)
    const [isSignedIn, setIsSignedIn] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [register, setRegister] = useState(false) 
    const [error, setError] = useState({
        email: '',
        password: '',
        repeatPasswordText: '',
        errorLogin: ''
    })
    const changePage = () =>{
        if(!register){
            setRegister(true);
            setError({
                email: '',
                password: '',
                repeatPasswordText: '',
                errorLogin: ''
            })
            setEmail('');
            setPassword('')
        }
        if(register){
            setRegister(false);
            setError({
                email: '',
                password: '',
                repeatPasswordText: '',
                errorLogin: ''
            })
            setEmail('');
            setPassword('')
        }
    }
    const RegisterUser = () =>{  
        if(password === error.password){
            createUserWithEmailAndPassword(auth, email, password)
            .then(res => {
                dispatch(currentUser(res.user.uid))
                setEmail('');
                setPassword('')
                setRegister('')
                navigation.navigate('App')
            })
            .catch(err=>{
                console.log(err)
                setPassword('')
            })
        }else{
            setError({...error, password: ''})
            setPassword('')

        }


    }
    const LogIn = () =>{
        setError('')
        signInWithEmailAndPassword(auth, email, password)
        .then(res => {
            dispatch(currentUser(res.user.uid))
            setEmail('');
            setPassword('')
            setRegister('')
            navigation.navigate('App')
        })
        .catch(err=>{
            setError({...error,errorLogin: 'Email y/o contraseña incorrecta'})
            console.log(err)
        })
    }

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{flex: 1}}
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ScrollView style={theme?styles.supremeContainer:styles.supremeContainerDark} contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}>
        {register?
            <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center'}}>
                <Text style={theme?styles.title2:styles.title2Dark}>Create your account</Text>
                <TextInput placeholder='Email' value={email} onChangeText={text => setEmail(text)} placeholderTextColor='#999'style={theme?styles.textInput:styles.textInputDark} 
                onSubmitEditing={() => ref_input2.current.focus()}
                blurOnSubmit={false}/>
                <Text> </Text>
                <TextInput placeholder='Password' value={password} onChangeText={text => setPassword(text)} placeholderTextColor='#999' secureTextEntry={true} style={theme?styles.textInput:styles.textInputDark}
                onSubmitEditing={() => ref_input3.current.focus()}
                ref={ref_input2}
                blurOnSubmit={false}/>
                <Text></Text>
                <TextInput placeholder='Repeat your password' placeholderTextColor='#999' value={error.password} secureTextEntry={true} onChangeText={text => setError({...error, password: text})} style={theme?styles.textInput:styles.textInputDark}
                ref={ref_input3}/>
                {error.password !== password?<Text style={styles.errorText}>Las contraseñas no coinciden</Text>:<Text> </Text>}
                <TouchableOpacity style={styles.button} onPress={RegisterUser}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
                <View>
                    <Text style={theme?styles.downText: styles.downTextDark} >Do you have an account? <Text style={styles.createAccount} onPress={changePage}>Log in</Text></Text>
                </View>
            </ScrollView>
            :
            <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center'}}>
                <Text style={theme?styles.title:styles.titleDark}>Log In</Text>
                <TextInput placeholder='Email' value={email} onChangeText={text => setEmail(text)} placeholderTextColor='#999'style={theme?styles.textInput:styles.textInputDark}
                onSubmitEditing={() => ref_input3.current.focus()}
                blurOnSubmit={false}/>
                <Text> </Text>
                <TextInput placeholder='Password' value={password} onChangeText={text => setPassword(text)} placeholderTextColor='#999' secureTextEntry={true} style={theme?styles.textInput:styles.textInputDark}
                ref={ref_input3}/>
                {error.errorLogin?<Text style={styles.errorText}>{error.errorLogin}</Text>:<Text> </Text>}
                <TouchableOpacity style={styles.button} onPress={LogIn}>
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>
                <View>
                    <Text style={theme?styles.downText: styles.downTextDark}>Don't have an account? <Text style={styles.createAccount} onPress={changePage}>Create one!</Text></Text>
                </View>
            </ScrollView>
        }
    </ScrollView>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

{/*      <TextInput placeholder='Email' value={email} onChangeText={text => setEmail(text)}/>
     <TextInput placeholder='Password'value={password} secureTextEntry={true} onChangeText={text => setPassword(text)}/>
     {isSignedIn? <Button title='SignOut' onPress={SignOut}/>:
       <Button title='SignIn' onPress={SignIn}/>
     } */}