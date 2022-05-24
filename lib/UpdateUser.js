import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';
import Mytextinput from './components/textInput';
import Mybutton from './components/button';
import { openDatabase } from 'react-native-sqlite-storage';
import validate from './components/validation';
 
var db = openDatabase({ name: 'UserDatabase.db' });
 
const UpdateUser = ({ navigation }) => {
  
  let [userName, setUserName] = useState('');
  let [userContact, setUserContact] = useState('');
  let [userAddress, setUserAddress] = useState('');
  let [userEmail, setUserEmail] = useState('');
  let [name, setName] = useState('');
  let [flag, setFlag] = useState(true);
 
  let updateAllStates = (name,email, contact, address)  => {
    setName(name);
    setUserEmail(email);
    setUserContact(contact);
    setUserAddress(address);
    
  };
 
  let searchUser = () => {
    console.log(userName);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user where user_username = ?',
        [userName],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(
              res.user_name,
              res.user_emailid,
              res.user_contact,
              res.user_address,
            );
            setFlag(false);
            console.log(flag)
          } else {
            alert('No user found');
            updateAllStates('', '', '','');
          }
        }
      );
    });
  };
  let updateUser = () => {
    console.log( userName, userContact, userAddress, userEmail);
    if (!name && !userName && !userEmail && !userContact && !userAddress) {
      alert('Please fill all details');
      return;
    }
    if (!name) {
      alert('Please fill name');
      return;
    }
    if (!userEmail) {
      alert('Please fill Email-id');
      return;
    }
    if (!userContact) {
      alert('Please fill Contact Number');
      return;
    }
    if (!userAddress) {
      alert('Please fill Address');
      return;
    }
    else if(validate({userEmail,userContact,userName}) == true){

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE table_user set user_name=?, user_emailid=?, user_contact=?, user_address=? where user_username=?',
        [name, userEmail, userContact, userAddress,userName],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Updation Failed');
        }
        
      );
    });}
  };
 
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <Mytextinput
                label="User Name"
            
                style={{ padding: 10 }}
                onChangeText={
                  (userName) => setUserName(userName)
                }
              />
              <Mybutton
                title="Search User"
                customClick={searchUser} 
              />
              <Mytextinput
                label="Name"
                
                value={name}
                style={{ padding: 10 }}
                onChangeText={
                  (name) => setName(name)
                }
                disabled={flag}

              />
              <Mytextinput
                label="Email-id"
               
                value={'' + userEmail}
                onChangeText={
                  (userEmail) => setUserEmail(userEmail)
                }
                maxLength={10}
                style={{ padding: 10 }}
                disabled={flag}
              />
              <Mytextinput
                label="Contact No."
              
                value={'' + userContact}
                onChangeText={
                  (userContact) => setUserContact(userContact)
                }
                maxLength={10}
                style={{ padding: 10 }}
                keyboardType="numeric"
                disabled={flag}
              />
              
              <Mytextinput
                label="Address"
                value={userAddress}
               
                onChangeText={
                  (userAddress) => setUserAddress(userAddress)
                }
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: 'top', padding: 10 }}
                disabled={flag}
              />
              <Mybutton
                title="Update User"
                customClick={updateUser}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
        
      </View>
    </SafeAreaView>
  );
};
 
export default UpdateUser;