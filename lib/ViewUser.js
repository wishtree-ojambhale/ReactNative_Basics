import React, { useState } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import Mytextinput from './components/textInput';
import Mybutton from './components/button';
import { openDatabase } from 'react-native-sqlite-storage';
 
var db = openDatabase({ name: 'UserDatabase.db' });
 
const ViewUser = () => {
  let [inputUserName, setInputUserName] = useState('');
  let [userData, setUserData] = useState({});
  let[flag,setFlag] = useState(false);
 
  let searchUser = () => {
    console.log(inputUserName);
    setUserData({});
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user where user_username = ?',
        [inputUserName],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            setUserData(results.rows.item(0));
            setFlag(true);
          } 
          else {
            alert('No user found');
          }
        }
      );
    });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytextinput
            label="User name"
            placeholder="Enter User Name"
            onChangeText={
              (inputUserName) => setInputUserName(inputUserName)
            }
            style={{ padding: 10 }}
          />
          <Mybutton title="Search User" customClick={searchUser} />
          <View
            style={{
              marginLeft: 35,
              marginRight: 35,
              marginTop: 10,
              borderWidth:1,
              padding:5
            }}>
              {flag ? <View><Text>User Name: {userData.user_username}</Text>
            <Text>Name: {userData.user_name}</Text>
            <Text>User Contact: {userData.user_contact}</Text>
            <Text>User Email: {userData.user_emailid}</Text>
            <Text>User Address: {userData.user_address}</Text></View>
            :
            <></>
            }
          </View>
        </View>
        
      </View>
    </SafeAreaView>
  );
};
 
export default ViewUser;