import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView , StyleSheet} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
 
var db = openDatabase({ name: 'UserDatabase.db' });
 
const ViewAllUser = () => {
  let [flatListItems, setFlatListItems] = useState([]);
  const [flag,setFlag] = useState(false);
  var temp = [];
 
  useEffect(() => {
  console.log(temp.length)
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user',
        [],
        (tx, results) => {
         
          for (let i = 0; i < results.rows.length; ++i){
            temp.push(results.rows.item(i));
          }
          setFlatListItems(temp);
        }
      );
    });
  }, []);
 
  let listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.2,
          width: '100%',
          backgroundColor: '#808080'
        }}
      />
    );
  };
 
  let listItemView = (item) => {
   
    return (
     
  <View 
  key={item.user_id}
  style={styles.body}>
  <Text style={styles.text}>Id: {item.user_id}</Text>
  <Text style={styles.text}>Name: {item.user_name}</Text>
  <Text style={styles.uName}>User Name: {item.user_username}</Text>
  <Text style={styles.text}>Email id: {item.user_id}</Text>
  <Text style={styles.text}>Contact: {item.user_contact}</Text>
  <Text style={styles.text}>Address: {item.user_address}</Text>
</View>
    );
  };
 
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {flatListItems.length === 0 ? <Text style={styles.displayMsg}>No Users found!</Text> : 
        <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
        
      </View>
      }
      
    </SafeAreaView>
  );
};
 
export default ViewAllUser;

const styles = StyleSheet.create({
text: {
  fontSize:20,
  color:"#111111"

},
body:{ 
  backgroundColor: 'white',
  padding:15,
  borderWidth:2,
  margin:5
},
displayMsg:{
  alignSelf:"center",
  fontSize:20,
  padding:10,
  color:"#111111"
},
uName:{
  color:'red',
  fontSize:20,
}

});
