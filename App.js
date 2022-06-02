

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import Home from "./screens/Home"
import Anime from './screens/Anime';
import Cryptocurrency from './screens/Cryptocurrency';
import Store from './screens/Store';
import StoreItemDetails from './screens/StoreItemDetails';
import Eapp from './screens/Api';
import Details from './screens/ItemDetails';
import { LogBox } from 'react-native';

const Stack = createNativeStackNavigator();
LogBox.ignoreAllLogs();
const App= () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{headerShown: false}}
        initialRouteName="Eapp"
      >
        <Stack.Screen name='Home' component={Home} options={{title:'List of API',headerTitleAlign:'center'}}/>
        <Stack.Screen name='Anime' component={Anime} />
        <Stack.Screen name='Cryptocurrency' component={Cryptocurrency} />  
        <Stack.Screen name='Store' component={Store} />  
        <Stack.Screen name='StoreItemDetails' component={StoreItemDetails} />  
        <Stack.Screen name='Eapp' component={Eapp} />  
        <Stack.Screen name='Details' component={Details} />  

      </Stack.Navigator>
    </NavigationContainer>
  );
};




export default App;
