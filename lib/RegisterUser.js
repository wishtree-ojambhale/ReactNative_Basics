import React, {useState, useRef} from 'react';
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
import {openDatabase} from 'react-native-sqlite-storage';
import validate from './components/validation';


var db = openDatabase({name: 'UserDatabase.db'});

const RegisterUser = ({navigation}) => {
  let [id, setId] = useState('');
  let [name, setName] = useState('');
  let [userContact, setUserContact] = useState('');
  let [userAddress, setUserAddress] = useState('');
  let [userName, setUserName] = useState('');
  let [userEmail, setUserEmail] = useState('');

  let register_user = () => {
    console.log(userName, userContact, userAddress, userName, userEmail);

    if (!name && !userName && !userEmail && !userContact && !userAddress) {
      alert('Please fill all details');
      return;
    } else if (!name) {
      alert('Please fill Name');
      return;
    } else if (!userName) {
      alert('Please fill User Name');
      return;
    } else if (!userEmail) {
      alert('Please fill Email');
      return;
    } else if (!userContact) {
      alert('Please fill Contact Number');
      return;
    } else if (!userAddress) {
      alert('Please fill Address');
      return;
    } else if (validate({userName, userEmail, userContact}) == true) {
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO table_user (user_name, user_contact, user_address, user_username, user_emailid) VALUES (?,?,?,?,?)',
          [name, userContact, userAddress, userName, userEmail],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert('Success', 'You are Registered Successfully', [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ]);
            } else alert('Registration Failed');
          },
        );
      });
    }
  };

  const uname = useRef();

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{flex: 1, justifyContent: 'space-between'}}>
            
              <Mytextinput
                label="Name"
                //placeholder="Enter Name"
                onChangeText={name => setName(name)}
                style={{padding: 10}}
    
              />
              <Mytextinput
                label="User Name"
                //placeholder="Enter Username"
                onChangeText={userName => setUserName(userName)}
                style={{padding: 10}}
              />
              <Mytextinput
                label="Email-id"
                //placeholder="Enter Email-id"
                value={userEmail}
                onChangeText={userEmail => setUserEmail(userEmail)}
                style={{padding: 10}}
              />
              <Mytextinput
                label="Contact No."
               // placeholder="Enter Contact No"
                value={userContact}
                onChangeText={userContact => setUserContact(userContact)}
                maxLength={10}
                keyboardType="numeric"
                style={{padding: 10}}
              />
              <Mytextinput
                label="Address"
                //placeholder="Enter Address"
                onChangeText={userAddress => setUserAddress(userAddress)}
                maxLength={225}
                numberOfLines={4}
                multiline={true}
                style={{textAlignVertical:'top', padding: 10}}
              />
              <Mybutton title="Submit" customClick={register_user} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterUser;
