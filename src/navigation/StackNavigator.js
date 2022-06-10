import React, { useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import Home from "../screens/home/Home.js";
import Add from "../screens/add/Add.js";
import CameraAdd from '../screens/add/Camera/CameraAdd.js';
import imageExpand from "../components/ImageExpand.js";
import Profile from "../screens/profile/Profile.js";

const Stack = createNativeStackNavigator();

function MyStack() {
    const [loaded] = useFonts({
        Dancing: require('../../assets/fonts/DancingScript-SemiBold.ttf'),
      });
      if (!loaded) {
        return null;
      }
    return( 
        <Stack.Navigator initialRouteName="Products">
            <Stack.Screen 
                name='Products' 
                component={Home}
                options={
                    {headerTitleStyle: {
                    fontFamily: 'Dancing',
                    fontSize: 35,
                  },
                  headerTitleAlign: 'center',
                headerBackVisible: false}}
            />
            <Stack.Screen 
                name='Add' 
                component={Add}
                options={{presentation: 'modal',
                headerTitleStyle: {
                    fontFamily: 'Dancing',
                    fontSize: 35,
                  },
                headerTitleAlign: 'center'}}
            />
            <Stack.Screen 
                name='Camera' 
                component={CameraAdd}
                options={{presentation: 'modal',
                headerTitleStyle: {
                    fontFamily: 'Dancing',
                    fontSize: 35,
                  },
                headerShown: false,
}}
            />
            <Stack.Screen 
                name='Image' 
                component={imageExpand}
                options={{presentation: 'modal',
                headerTitleStyle: {
                    fontFamily: 'Dancing',
                    fontSize: 35,
                  },
                  headerShown: false
                }}
            />

        </Stack.Navigator>
    )
}

function ProfileStackNavigator(){
    const [loaded] = useFonts({
        Dancing: require('../../assets/fonts/DancingScript-SemiBold.ttf'),
      });
      if (!loaded) {
        return null;
      }
    return (
      <Stack.Navigator>
        <Stack.Screen 
            name="Profile" 
            component={Profile}
            options={
                {headerTitleStyle: {
                fontFamily: 'Dancing',
                fontSize: 35,
              },
              headerTitleAlign: 'center'}} 
            />
      </Stack.Navigator>
    );
  }

export { MyStack, ProfileStackNavigator }
