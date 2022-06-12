import React, {useState,useEffect} from 'react';
import {View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {TextInput, Button} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({name: 'UserDatabase1.db'});

export default function AddTask(props) {
  const [title, setTitle] = useState();
  const [task, setTask] = useState();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);

   let enterData = () => {
    console.log(title, task);

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
  
  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient
        colors={['#2F3C4F', '#506F86', '#FBB040']}
        style={{flex: 1}}>
        <View style={{padding: 5}}>
          <Text
            style={{
              color: '#FBB040',
              fontSize: 20,
              fontWeight: '700',
              alignSelf: 'center',
            }}>
            Add Task
          </Text>
        </View>
        <View
          style={{
            padding: 10,
            margin: 10,
            borderWidth: 1,
            borderColor: '#FBB040',
            flexDirection: 'column',
          }}>
          <TextInput
            label="Title"
            value={title}
            onChangeText={title => setTitle(title)}
            mode="outlined"
            outlineColor="#FBB040"
            activeOutlineColor="#506F86"
            placeholderTextColor="red"
            style={{padding: 10, height: 30}}
          />
          <TextInput
            label="Task"
            value={task}
            onChangeText={task => setTask(task)}
            mode="outlined"
            outlineColor="#FBB040"
            activeOutlineColor="#506F86"
            placeholderTextColor="red"
            style={{padding: 10, height: 30}}
          />
          <Button
            mode="contained"
            color="#506F86"
            labelStyle={{fontSize: 10, color: '#FBB040', fontWeight: '700'}}
            style={{width: '50%', alignSelf: 'center', margin: 10}}
            onPress={() => setOpen(true)}>
            Date and Time
          </Button>
          <DatePicker
            modal
            timeZoneOffsetInMinutes={+5*60+30}
            open={open}
            date={date}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          <Button
            mode="contained"
            color="#506F86"
            style={{width: '50%', alignSelf: 'center'}}
            labelStyle={{fontSize: 10,color: '#FBB040', fontWeight: '700'}}
            onPress={() => props.navigation.navigate('Todo',{data:title})}>
            Add
          </Button>
         
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
