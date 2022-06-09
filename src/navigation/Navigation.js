import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer, DarkTheme, DefaultTheme } from "@react-navigation/native";
import  BottomTabNavigator  from './TabNavigator'
import { StatusBar } from 'react-native'


export default function Navigation() {
    const theme = useSelector(state => state.theme)
    return(
        <>
          <StatusBar
                backgroundColor={
                    theme
                    ? 'white'
                    : '#121212'
                }
                barStyle={
                    theme
                    ? 'dark-content'
                    : 'red'
                    
                }
            />
            <NavigationContainer theme={theme? DefaultTheme : DarkTheme}>
                <BottomTabNavigator />
            </NavigationContainer>
        </>
    )
}