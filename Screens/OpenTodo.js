import {View, Text, Alert, ActivityIndicator,Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput, Button} from 'react-native-paper';
import {openDatabase} from 'react-native-sqlite-storage';
import LinearGradient from 'react-native-linear-gradient';
import Update from './Database/update_data';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Dropdown} from 'react-native-element-dropdown';
import css from '../styles/dropdown_css';
import textInput from '../styles/textinput._css';
import Mytextinput from './components/Mytextinput';
import button from '../styles/button_css';

var db = openDatabase({name: 'UserDatabase1.db'});

const OpenTodo = props => {
  const task = props?.route?.params?.data.task;
  const title1 = props?.route?.params.data.title;
  const id1 = props?.route?.params?.data.id;
  const category1 = props?.route?.params?.data.category;
  const selectedColor=props?.route?.params?.data.color;
  const [selectedDate, setSelectedDate] = useState(
    props?.route?.params?.data.date,
  );
  
  const [tasks, setTask] = useState(task);
  const [title, setTitle] = useState(title1);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFocusCateg, setIsFocusCateg] = useState(false);
  const [cate, setCate] = useState();
  const [categLabel, setCategLabel] = useState(category1);
  // const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(selectedColor);

  const [day, setDay] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [hour, setHour] = useState();
  const [min, setMin] = useState();
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    dataLoading();
    loading
      ? setSelectedDate(month + '/' + day + '/' + year + ' ' + hour + ':' + min)
      : null;

  });

  function validation(){
    if(title==undefined || title=="" || task==undefined || task=="" || categLabel==undefined || month==undefined){
      setFlag(true);
    }
    else{
      Update({
        id: id1,
        task: tasks,
        title: title,
        category:categLabel,
        date: day==undefined ? selectedDate:  month + '/' + day + '/' + year + ' ' + hour + ':' + min,
        color:value
      }),
        props.navigation.navigate('Todo');
    }
  }

  function loader() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }
  var categList = [{label:'Work',value:'skyblue'}];
  const [list,setList] = useState([]);
 
  function dataLoading(){
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_category', [], (tx, results) => {
        for (let i = 0; i < results.rows.length; ++i) {
         
          categList.push({label:results.rows.item(i).user_category,value:results.rows.item(i).user_color})
          }
          setList(categList);
      });
    });
  }


  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={['#2F3C4F', '#506F86', '#FBB040']}
        style={{flex: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button color="#FBB040" onPress={() => props.navigation.goBack()}>
            <Icon name="arrow-left" size={20} color="#FBB040" />
          </Button>
          <View style={{flexDirection: 'row-reverse'}}>
          </View>
        </View>
        <View style={{padding: 5}}>
          <Text
            style={{
              color: '#FBB040',
              fontSize: 20,
              fontWeight: '700',
              alignSelf: 'center',
            }}>
            Edit Task
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
            label="Title"
            value={title}
            onChangeText={text => setTitle(text)}
          />
          {flag&!title? <Text style={{color:'red'}}>Please enter the title </Text>:<></>}
          <Mytextinput 
          label="Task"
          value={task}
          onChangeText={text => setTask(text)}
          />
          {flag&!task? <Text style={{color:'red'}}>Please enter task </Text> :<></>}
        <Dropdown
            style={[css.dropdown, isFocusCateg && {borderColor: '#FBB040'}]}
            placeholderStyle={css.placeholderStyle}
            selectedTextStyle={{color: 'black'}}
            inputSearchStyle={css.inputSearchStyle}
            iconStyle={css.iconStyle}
            data={list}
            //search={true}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocusCateg ? category1 : 'Select Category'}
            //searchPlaceholder="Search..."
            value={cate}
            onFocus={() => setIsFocusCateg(true)}
            onBlur={() => setIsFocusCateg(false)}
            onChange={item => {
              setCate(item.value);
              setCategLabel(item.label);
              setIsFocusCateg(false);
            }}
          /> 
          {flag&!categLabel? <Text style={{color:'red'}}>Please select category </Text> :<></>}
            <Pressable onPress={()=>setOpen(true)}>
            <TextInput
              style={{padding: 10, height: 30, paddingLeft: 0}}
              label="Date and Time"
              defaultValue={selectedDate}
              value={selectedDate}
              editable={false}
              mode="outlined"
              outlineColor="#FBB040"
              activeOutlineColor="#506F86"
            />
            </Pressable>
          <DatePicker
            modal
            timeZoneOffsetInMinutes={+5 * 60 + 30}
            open={open}
            date={date}
            onConfirm={date => {
              loader();
              setOpen(false);
              setDate(date);
              setDay(
                date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
              );
              setMonth(
                date.getMonth() + 1 < 10
                  ? '0' + (date.getMonth() + 1)
                  : date.getMonth() + 1,
              );
              setYear(date.getFullYear());
              setHour(
                date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
              );
              setMin(
                date.getMinutes() < 10
                  ? '0' + date.getMinutes()
                  : date.getMinutes(),
              );
              
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
           {flag&!selectedDate? <Text style={{color:'red'}}>Please select date time </Text> :<></>}
            <Button
            mode="contained"
            color="#506F86"
            labelStyle={button.label}
            style={button.layout}
            icon="update"
              onPress={() => {
                validation()
              }}>
            Update
          </Button>
        </View>
      </LinearGradient>
    </View>
  );
};

export default OpenTodo;
