import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MyStack, ProfileStackNavigator } from "./StackNavigator";
import MaterialCommunityIcons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();


export default function BottomTabNavigator(){
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} >
      <Tab.Screen 
            name="Home" 
            component={MyStack}  
            options={{tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home-outline" color={color} size={size} />
            )
          }}/>
      <Tab.Screen 
            name="ProfileTab" 
            component={ProfileStackNavigator} 
            options={{title: 'Profile',tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="person-outline" color={color} size={size} />
            )}}/>
    </Tab.Navigator>
  );
};
