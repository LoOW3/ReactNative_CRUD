import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from 'expo-font';


import Home from "./screens/Home.js";
import Add from "./screens/Add.js";
import Add2 from './screens/Add2.js';
import imageExpand from "./components/ImageExpand.js";


const Stack = createNativeStackNavigator();


function MyStack() {
    const [loaded] = useFonts({
        Dancing: require('../assets/fonts/DancingScript-SemiBold.ttf'),
      });
      if (!loaded) {
        return null;
      }
    return( 
        <Stack.Navigator>
            <Stack.Screen 
                name='Products' 
                component={Home}
                options={
                    {headerTitleStyle: {
                    fontFamily: 'Dancing',
                    fontSize: 35,
                  }}}
            />
            <Stack.Screen 
                name='Add' 
                component={Add}
                options={{presentation: 'modal',
                headerTitleStyle: {
                    fontFamily: 'Dancing',
                    fontSize: 35,
                  }}}
            />
            <Stack.Screen 
                name='Camera' 
                component={Add2}
                options={{presentation: 'modal',
                headerTitleStyle: {
                    fontFamily: 'Dancing',
                    fontSize: 35,
                  },
                headerShown: false,}}
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

export default function Navigation() {
    return(
    <NavigationContainer>
        <MyStack />
    </NavigationContainer>
    )
}