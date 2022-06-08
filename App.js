import React from 'react';
import {
  SafeAreaView,
  Text,
  
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from './Screens/Home';


const Stack = createNativeStackNavigator();

const App = () => {
  

  return (
    <NavigationContainer>
    <Stack.Navigator
    screenOptions={{headerShown:false}}
    initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Home}/>
      
    </Stack.Navigator>
  </NavigationContainer>
  );
};

export default App;
