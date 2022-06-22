import React from 'react';
import { Alert } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';


var db = openDatabase({ name: 'UserDatabase1.db' });

 const Insert = ({title:title,task:task,color:color,date:date,category:category}) => {

  db.transaction(function (tx) {
  
    tx.executeSql(
      'INSERT INTO table_todo (user_title, user_task, user_color, user_date, user_category) VALUES (?,?,?,?,?)',
      [title,task,color,date,category],
      (tx, results) => {
        if (results.rowsAffected > 0) {
      
          console.log('Success', 'Note added');
          
        } else console.log('Registration Failed');
      },
    );
  });

}


export default Insert;
