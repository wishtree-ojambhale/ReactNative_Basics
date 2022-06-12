import React from 'react'
import {View,Text} from 'react-native'
import { openDatabase } from 'react-native-sqlite-storage';


var db = openDatabase({ name: 'UserDatabase1.db' });

export default  Create(()=> {

    useEffect(() => {
        db.transaction(function (txn) {
          txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='table_todo'",
            [],
            function (tx, res) {
              //console.log('item:', res.rows.length);
              if (res.rows.length == 0) {
                txn.executeSql('DROP TABLE IF EXISTS table_todo', []);
                txn.executeSql(
                  'CREATE TABLE IF NOT EXISTS table_todo(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_title VARCHAR(20), user_task VARCHAR(255))',
                  []
                );
              }
            }
          );
        });
      }, []);

  return (
    <View>
        <Text></Text>
    </View>
  );
});
