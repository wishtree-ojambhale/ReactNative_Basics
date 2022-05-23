import 'react-native-gesture-handler';
 
import * as React from 'react';
import { Button, View, Text } from 'react-native';
 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
 
import HomeScreen from './lib/HomeScreen';
import RegisterUser from './lib/RegisterUser';
import UpdateUser from './lib/UpdateUser';
import ViewUser from './lib/ViewUser';
import ViewAllUser from './lib/ViewAllUser';
import DeleteUser from './lib/DeleteUser';
 
const Stack = createStackNavigator();
 
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: 'Home', //Set Header Title
            headerTitleAlign:"center",
            headerStyle: {
              backgroundColor: '#f05555', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="View"
          component={ViewUser}
          options={{
            title: 'View User', 
            headerTitleAlign:"center",
            headerStyle: {
              backgroundColor: '#f05555', 
            },
            headerTintColor: '#fff', 
            headerTitleStyle: {
              fontWeight: 'bold', 
            },
          }}
        />
        <Stack.Screen
          name="ViewAll"
          component={ViewAllUser}
          options={{
            title: 'View Users', 
            headerTitleAlign:"center",
            headerStyle: {
              backgroundColor: '#f05555', 
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold', 
            },
          }}
        />
        <Stack.Screen
          name="Update"
          component={UpdateUser}
          options={{
            title: 'Update User', 
            headerTitleAlign:"center",
            headerStyle: {
              backgroundColor: '#f05555', 
            },
            headerTintColor: '#fff', 
            headerTitleStyle: {
              fontWeight: 'bold', 
            },
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterUser}
          options={{
            title: 'Register User', 
            headerTitleAlign:"center",
            headerStyle: {
              backgroundColor: '#f05555', 
            },
            headerTintColor: '#fff', 
            headerTitleStyle: {
              fontWeight: 'bold', 
            },
          }}
        />
        <Stack.Screen
          name="Delete"
          component={DeleteUser}
          options={{
            title: 'Delete User', 
            headerTitleAlign:"center",
            headerStyle: {
              backgroundColor: '#f05555',
            },
            headerTintColor: '#fff', 
            headerTitleStyle: {
              fontWeight: 'bold', 
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
 
export default App;