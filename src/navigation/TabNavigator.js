import React, {useEffect}from "react";
import {useSelector} from 'react-redux'
import { TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MyStack, ProfileStackNavigator } from "./StackNavigator";
import MaterialCommunityIcons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../screens/signIn/SignIn";
import { createDrawerNavigator} from "@react-navigation/drawer";
import DrawerContent from "./DrawerContent";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
import { useNavigation } from '@react-navigation/native';

function AppNavigation(){

  return (
    <Drawer.Navigator screenOptions={{ headerShown: false}} drawerContent={props => <DrawerContent {... props}/>} >
      <Drawer.Screen 
            name="Home" 
            component={MyStack}  
            />
      <Drawer.Screen 
            name="ProfileTab" 
            component={ProfileStackNavigator} 
            />
    </Drawer.Navigator>
  );
};

export default function BottomTabNavigator(){
  const user = useSelector(state=> state.currentUser)
  return(
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user?<></>:<Stack.Screen 
        name="SignIn"
        component={SignIn}
        />}
      <Stack.Screen 
        name='App'
        component={AppNavigation}
        options={{gestureEnabled: false}}
      />
    </Stack.Navigator>
  )
}
