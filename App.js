import React,{useEffect} from 'react';
import {
  SafeAreaView,
  Text,LogBox
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  {NavigationContainer, StackActions} from '@react-navigation/native';
import Todo from './Screens/Todo'
import AddTask from './Screens/AddTask';
import OpenTodo from './Screens/OpenTodo';
import Category from './Screens/Category';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({name: 'UserDatabase1.db'});
const Stack =   createNativeStackNavigator();
LogBox.ignoreAllLogs();
const App= () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Todo'
      screenOptions={{headerShown:false}}
      >
        <Stack.Screen name='Todo' component={Todo} />
        <Stack.Screen name='AddTask' component={AddTask} />
        <Stack.Screen name='OpenTodo' component={OpenTodo} />
        <Stack.Screen name='Category' component={Category} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
