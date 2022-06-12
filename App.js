import React from 'react';
import {
  SafeAreaView,
  Text
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  {NavigationContainer, StackActions} from '@react-navigation/native';
import Todo from './Screens/Todo'
import AddTask from './Screens/AddTask';

const Stack =   createNativeStackNavigator();

const App= () => {
 

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Todo'
      screenOptions={{headerShown:false}}
      >
        <Stack.Screen name='Todo' component={Todo} />
        <Stack.Screen name='AddTask' component={AddTask} />
          
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
