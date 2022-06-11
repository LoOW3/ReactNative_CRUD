import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { 
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer'
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import { changeTheme } from '../redux/actions'
import { useNavigation } from '@react-navigation/native';
import { cleanCurrentUser } from '../redux/actions';
import { auth } from "../config/fb";
import { signOut, getAuth } from "firebase/auth";


export default function DrawerContent(props) {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user = useSelector(state => state.currentUser)
    const [isDark,setIsDark] = useState(false)
    const changeThemeApp = async() =>{
        setIsDark(!isDark)
        dispatch(changeTheme())
    }
    const SignOut = () => {
        signOut(auth)
        .then(res=>{
          dispatch(cleanCurrentUser())
          navigation.navigate('SignIn')
          
        })
        .catch(err=>{
            console.log(err)
        })
    }

  return (
    <View style={{flex: 1}}> 
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
            <View style={styles.userInfoSection}>
                <View style={{flexDirection:'row', marginTop: 15}}>
                    <Avatar.Image
                        source={require('../../assets/images/defaultAvatar.png')}
                        size={50}
                    />
                    <View style={{marginLeft: 15}}>
                        <Title style={styles.title}>{currentUser? currentUser.providerData[0].displayName: 'Unknown'}</Title>
                        <Caption style={styles.caption}>{currentUser?currentUser.providerData[0].email : ''}</Caption>
                    </View>
                </View>
            </View>
            <Drawer.Section style={[styles.bottomDeawerSection,{marginTop: 30}]}>
                <DrawerItem 
                    icon={(color,size) =>(
                        <Icon name='home-outline'
                        color={color}
                        size={20}
                        />
                        )}
                    label='Home'
                    onPress={()=> {navigation.navigate('Home')}}
                />
                <DrawerItem 
                    icon={(color,size) =>(
                        <Icon name='person-outline'
                        color={color}
                        size={20}
                        />
                    )}
                    label='Profile'
                    onPress={()=> {navigation.navigate('ProfileTab')}}
                />
            </Drawer.Section>
            <Drawer.Section title='Preferences'>
                <TouchableRipple onPress={changeThemeApp}>
                    <View style={styles.preference}>
                        <Text>Dark Theme</Text>
                        <View pointerEvents='none'>
                            <Switch value={isDark}/>
                        </View>
                    </View>
                </TouchableRipple>
            </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDeawerSection}>
        <DrawerItem 
            icon={(color,size) =>(
                <Icon name='log-out-outline'
                color={color}
                size={25}
                />
                )}
            label='Sign Out'
            onPress={SignOut}
        />
      </Drawer.Section>
    </View>
  )
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title:{
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15
    },
    bottomDeawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16
    }
})