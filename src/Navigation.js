import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from 'expo-font';


import Home from "./screens/Home.js";
import Add from "./screens/Add.js";


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