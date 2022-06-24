import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StatusBar
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import homeCss from '../styles/homescreen_Css';
import LinearGradient from 'react-native-linear-gradient';
import {Button, Drawer} from 'react-native-paper';
import {openDatabase} from 'react-native-sqlite-storage';
import create from './Database/Create_table';
import deleteTask from './Database/delete_task';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

var db = openDatabase({name: 'UserDatabase1.db'});

const Todo = props => {
  let [flatListItems, setFlatListItems] = useState([]);
  var temp = [];


  useEffect(() => {
    create();

    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_todo', [], (tx, results) => {
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
          }
        setFlatListItems(temp);
      });
    });
  }, [flatListItems]);

  let listItemView = item => {
    return (
      <View
        key={item.user_id}
        style={[homeCss.note, {backgroundColor: item.user_color}]}>
        <View flex={1}>
          <Text numberOfLines={1} style={homeCss.titleText}>{item.user_title}</Text>
          {item.user_category ? (
            <Text style={homeCss.category}>Category: {item.user_category}</Text>
          ) : (
            <></>
          )}
          {item.user_task ? (
            <Text numberOfLines={3} style={homeCss.task}>
              Task: {item.user_task}
            </Text>
          ) : (
            <></>
          )}
          <Text numberOfLines={3} style={homeCss.task}>
            {item.user_date}
          </Text>
        </View>
        <View
          style={homeCss.buttons}>
          <Button
            icon="pencil"
            labelStyle={{fontSize: 20, color: 'white'}}
            alignSelf="center"
            onPress={() =>
              props.navigation.navigate('OpenTodo', {
                data: {
                  id: item.user_id,
                  title: item.user_title,
                  task: item.user_task,
                  date: item.user_date,
                  category: item.user_category,
                  color: item.user_color,
                },
              })
            }></Button>
          <Button
            icon="delete"
            labelStyle={{fontSize: 20, color: 'white'}}
            alignSelf="center"
            onPress={() => deleteTask(item.user_id)}></Button>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={homeCss.body}>
      <StatusBar backgroundColor={'#2F3C4F'}/>
      <LinearGradient
        colors={['#2F3C4F', '#506F86', '#FBB040']}
        style={{flex: 1}}>
      
        <View style={{flex: 1, flexDirection: 'column'}}>

          <View style={{alignSelf: 'center'}}>
            <Text style={homeCss.heading}>TODO LIST</Text>
          </View>

          <View flex={1}>
            {flatListItems.length === 0 ? (
              <Text style={homeCss.displayMsg}>Empty </Text>
            ) : (
              <FlatList
                data={flatListItems.sort((a, b) =>
                  a.user_date?.localeCompare(b.user_date),
                )}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => listItemView(item)}
              />
            )}
          </View>
          <ActionButton style={{bottom: -15}} buttonColor="#506F86">
            <ActionButton.Item
              buttonColor="#FBB040"
              title="Category"
              onPress={() => props.navigation.navigate('Category')}>
              <Icon
                name="ellipsis-horizontal"
                style={homeCss.actionButtonIcon}
              />
            </ActionButton.Item>
           
            <ActionButton.Item
              buttonColor="#2F3C4F"
              title="Task"
              onPress={() => props.navigation.navigate('AddTask')}>
              <Icon name="clipboard" style={homeCss.actionButtonIcon} />
            </ActionButton.Item>
          </ActionButton>

        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Todo;
