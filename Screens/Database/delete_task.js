import React,{useEffect} from 'react'
import {View,Text} from 'react-native'
import { openDatabase } from 'react-native-sqlite-storage';


var db = openDatabase({ name: 'UserDatabase1.db' });

 const deleteTask=(id)=> {


  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM table_todo where user_id=?',
      [id],
    );
  });
}


export default deleteTask;
