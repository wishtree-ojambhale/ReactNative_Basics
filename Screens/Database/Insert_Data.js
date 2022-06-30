
import moment from 'moment';
import { openDatabase } from 'react-native-sqlite-storage';


var db = openDatabase({ name: 'UserDatabase1.db' });

//will add the new entry of task in the table
 const Insert = ({title:title,task:task,color:color,date:date,category:category}) => {

  db.transaction(function (tx) {
    var currentDateTime = new Date().toString();
    console.log(currentDateTime);
    tx.executeSql(
      'INSERT INTO table_todo (user_title, user_task, user_color, user_date, user_category, user_currentDateTime) VALUES (?,?,?,?,?,?)',
      [title,task,color,date,category,currentDateTime],
      (tx, results) => {
        if (results.rowsAffected > 0) {
      
          console.log('Success', 'Note added');
          
        } else console.log('Registration Failed');
      },
    );
  });

}


export default Insert;
