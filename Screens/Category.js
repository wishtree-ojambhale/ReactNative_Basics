import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {Button} from 'react-native-paper';
import {openDatabase} from 'react-native-sqlite-storage';
import {Dropdown} from 'react-native-element-dropdown';
import Color_Array from '../Screens/components/Color_Array';
import css from '../styles/dropdown_css';
import Mytextinput from './components/Mytextinput';
import {button} from '../styles/button_css';

var db = openDatabase({name: 'UserDatabase1.db'});

const Category = props => {
  const [categoryName, setCategoryName] = useState();
  const [value, setValue] = useState();
  const [isFocus, setIsFocus] = useState(false);
  const [flag, setFlag] = useState(false);

  // const clearCateg = () => {
  //   db.transaction(function (tx) {
  //     tx.executeSql('DROP TABLE table_category');
  //   });
  // };

  function validate() {
    if (
      categoryName === undefined ||
      categoryName === '' ||
      value === undefined ||
      value === ''
    ) {
      setFlag(true);
    } else {
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO table_category (user_category, user_color) VALUES (?,?)',
          [categoryName, value],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              console.log('Success', 'Note added');
            } else console.log('Registration Failed');
          },
        );
      });
      props.navigation.navigate('Todo');
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient
        colors={['#2F3C4F', '#506F86', '#2F3C4F']}
        style={{flex: 1}}>
        <View style={{padding: 5}}>
          <Text
            style={{
              color: '#FBB040',
              fontSize: 20,
              fontWeight: '700',
              alignSelf: 'center',
            }}>
            Add Category
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
          <Mytextinput
            label="Category"
            value={categoryName}
            onChangeText={name => setCategoryName(name)}
          />
          {flag & !categoryName ? (
            <Text style={{color: 'red'}}>Please enter the Category </Text>
          ) : (
            <></>
          )}
          <Dropdown
            style={[css.dropdown, isFocus && {borderColor: '#FBB040'}]}
            placeholderStyle={css.placeholderStyle}
            selectedTextStyle={{color: 'white', backgroundColor: value}}
            inputSearchStyle={css.inputSearchStyle}
            iconStyle={css.iconStyle}
            data={Color_Array}
            search={false}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select color' : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              //setLabel(item.label);
              setIsFocus(false);
            }}
          />
          {flag & !value ? (
            <Text style={{color: 'red'}}>Please select Color </Text>
          ) : (
            <></>
          )}
          <Button
            mode="contained"
            color="#506F86"
            style={button.layout}
            labelStyle={button.label}
            onPress={() => [validate()]}>
            Add
          </Button>
          {/* <Button
            mode="contained"
            color="#506F86"
            labelStyle={{fontSize: 15, color: '#FBB040', fontWeight: '700'}}
            style={{
              shadowColor: 'black',
              shadowRadius: 7,
              width: '50%',
              alignSelf: 'center',
              marginTop: 10,
              borderWidth: 1,
            }}
            onPress={()=>[clearCateg(),props.navigation.navigate('Todo')]}
            >clear</Button> */}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};
export default Category;
