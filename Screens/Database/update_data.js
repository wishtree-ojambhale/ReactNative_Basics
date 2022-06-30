import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'UserDatabase1.db'});

const Update = ({
  id: id,
  task: task,
  title: title,
  date: date,
  category: category,
  color: color,
}) => {
  db.transaction(tx => {
    var currentDateTime = new Date().toString();
    tx.executeSql(
      'UPDATE table_todo set user_task=?, user_title=?, user_date=?, user_category=?, user_color=?, user_currentDateTime=? where user_id=?',
      [task, title, date, category, color, currentDateTime, id],
      (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          console.log('User updated successfully');
        } else {
          console.log('Updation Failed');
        }
      },
    );
  });
};

export default Update;
