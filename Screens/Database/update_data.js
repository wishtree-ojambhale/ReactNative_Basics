
import { openDatabase } from 'react-native-sqlite-storage';


var db = openDatabase({ name: 'UserDatabase1.db' });

 const Update = ({id:id,task:task,title:title,date:date,category:category,color:color}) => {
      console.log(title,task);
      db.transaction((tx) => {
      tx.executeSql(
        'UPDATE table_todo set user_task=?, user_title=?, user_date=?, user_category=?, user_color=? where user_id=?',
        [task,title,date,category,color,id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('User updated successfully')
          } else console.log('Updation Failed');
        }
        
      );
    })

}


export default Update;
