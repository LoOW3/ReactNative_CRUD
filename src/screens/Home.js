import React from 'react'
import { Button, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function Home() {
    const navigation = useNavigation();

  return (
      <> 
      <Text>Home</Text>
      <Button title='go to Add screen' onPress={() => navigation.navigate('Add')}/>
      </>
  )
}
