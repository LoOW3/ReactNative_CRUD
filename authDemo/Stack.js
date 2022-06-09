import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import React from 'react'
import Home from "./Home";
import SignIn from "../src/screens/signIn/SignIn";
import { auth } from "../src/config/fb";

const Stack = createNativeStackNavigator();

export default function StackAuth() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='SignIn' component={SignIn}/>
            <Stack.Screen name='Home' component={Home}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})