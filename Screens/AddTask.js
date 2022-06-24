import React, {useState, useEffect} from 'react';
import {View, Text, Alert, StyleSheet, Keyboard, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {TextInput, Button} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import {openDatabase} from 'react-native-sqlite-storage';
import Insert from './Database/Insert_Data';
import {Dropdown} from 'react-native-element-dropdown';
import css from '../styles/dropdown_css';
import button from '../styles/button_css';
import Mytextinput from './components/Mytextinput';
import PushNotification, {Importance} from 'react-native-push-notification';

var db = openDatabase({name: 'UserDatabase1.db'});

const AddTask = props => {
  const [title, setTitle] = useState();
  const [task, setTask] = useState();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [day, setDay] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [hour, setHour] = useState();
  const [min, setMin] = useState();
  const [cate, setCate] = useState();
  const [categLabel, setCategLabel] = useState();
  const [isFocusCateg, setIsFocusCateg] = useState(false);
  const [list, setList] = useState([]);
  const [flag, setFlag] = useState(false);
  //const [notifDate, setNotifDate] = useState(new Date());

 
  useEffect(() => {
    loading
      ? setSelectedDate(month + '/' + day + '/' + year + ' ' + hour + ':' + min)
      : null;
      
  });

  var categList = [{label: 'Work', value: 'skyblue'}];

  function dataLoading() {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_category', [], (tx, results) => {
        for (let i = 0; i < results.rows.length; ++i) {
         // console.log('running');
          categList.push({
            label: results.rows.item(i).user_category,
            value: results.rows.item(i).user_color,
          });
        }
        setList(categList);
      });
    });
  }

  function loader() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }
  
  // Validation funtion
  function validation(){
    if(title==undefined || title=="" || task==undefined || task=="" || categLabel==undefined || month==undefined){
      setFlag(true);
    }
    else{
      Insert(
        {
          title: title,
          task: task,
          color: cate,
          category: categLabel,
          date: month + '/' + day + '/' + year + ' ' + hour + ':' + min,
        });
        props.navigation.navigate('Todo');
        notification();
        // localNotif();
        //notify();
      }
  }


  const notifChannel=()=>{
  PushNotification.createChannel(
    {
      channelId: "Notify", // (required)
      channelName: "Local_Notif", // (required)
      channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
      playSound: true, // (optional) default: true
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );
}

  function notification(){

  PushNotification.localNotificationSchedule({
    //... You can use all the options from localNotifications
    channelId: "Notify",
    message: {task}, // (required)
    date: new Date(Date.now() + 5 * 1000) , // in 60 secs
    allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
    /* Android Only Properties */
    repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
  });
}

function localNotif(){
  PushNotification.localNotification({
    /* Android Only Properties */
    channelId: "10101", // (required) channelId, if the channel doesn't exist, notification will not trigger.
    ticker: "My Notification Ticker", // (optional)
    showWhen: true, // (optional) default: true
    autoCancel: true, // (optional) default: true
    largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
    largeIconUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
    smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
    bigText: "My big text that will be shown when notification is expanded. Styling can be done using HTML tags(see android docs for details)", // (optional) default: "message" prop
    subText: "This is a subText", // (optional) default: none
    bigPictureUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
    bigLargeIcon: "ic_launcher", // (optional) default: undefined
    bigLargeIconUrl: "https://www.example.tld/bigicon.jpg", // (optional) default: undefined
    color: "red", // (optional) default: system default
    vibrate: true, // (optional) default: true
    vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    tag: "some_tag", // (optional) add tag to message
    group: "group", // (optional) add group to message
    groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
    ongoing: false, // (optional) set whether this is an "ongoing" notification
    priority: "high", // (optional) set notification priority, default: high
    visibility: "private", // (optional) set notification visibility, default: private
    ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
    shortcutId: "shortcut-id", // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
    onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false
    
    when: null, // (optional) Add a timestamp (Unix timestamp value in milliseconds) pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
    usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
    timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
  
    messageId: "google:message_id", // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module. 
  
    actions: ["Yes", "No"], // (Android only) See the doc for notification actions to know more
    invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
  
    /* iOS only properties */
    category: "", // (optional) default: empty string
    subtitle: "My Notification Subtitle", // (optional) smaller title below notification title
  
    /* iOS and Android properties */
    id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
    title: "My Notification Title", // (optional)
    message: "My Notification Message", // (required)
    picture: "https://www.example.tld/picture.jpg", // (optional) Display an picture with the notification, alias of `bigPictureUrl` for Android. default: undefined
    userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
    playSound: false, // (optional) default: true
    soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    repeatType: "day", // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
  });
}
// function toTimestamp(strDate){
//   var datum = Date.parse(strDate);
//   setNotifDate(datum);
//  }


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
            Add Task
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
            label="Title*"
            value={title}
            onChangeText={title => [setTitle(title)]}
          />
          {flag&!title? <Text style={{color:'red'}}>Please enter the title </Text>:<></>}
          <Mytextinput
            label="Task*"
            value={task}
            onChangeText={task => [setTask(task)]} 
            
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
            placeholder={!isFocusCateg ? 'Select Category*' : 'Select Category'}
           // searchPlaceholder="Search..."
            value={cate}
            onFocus={() => [setIsFocusCateg(true), dataLoading(),notifChannel()]}
            onBlur={() => setIsFocusCateg(false)}
            onChange={item => {
              setCate(item.value);
              setCategLabel(item.label);
              setIsFocusCateg(false);
            }}
          />
           {flag&!categLabel? <Text style={{color:'red'}}>Please select category </Text> :<></>}
          <Pressable onPress={() => setOpen(true)}>
            <TextInput
              style={{padding: 10, height: 30, paddingLeft: 0}}
              label="Date and Time*"
              value={selectedDate}
              // onPressIn={()=>setOpen(true)}
              editable={false}
              mode="outlined"
              outlineColor="#FBB040"
              activeUnderlineColor="#FBB040"
              activeOutlineColor="#506F86"
              onMagicTap={() => setOpen(true)}
            />
          </Pressable>
          <DatePicker
            modal
            minimumDate={new Date()}
            is24hourSource="device"
            timeZoneOffsetInMinutes={+5 * 60 + 30}
            open={open}
            date={date}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
              //toTimestamp(date);
              console.log(new Date(Date.now()));
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
              loader();
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          {flag&!month? <Text style={{color:'red'}}>Please select date time </Text> :<></>}
          {/* <Button mode='contained' onPress={() => console.log(day+'/'+month+'/'+year+' '+hour+':'+min)}>print</Button> */}

          <Button
            mode="contained"
            color="#506F86"
            style={button.layout}
            labelStyle={button.label}
            onPress={() =>
            validation()
            }>
            Add
          </Button>
          <Button onPress={()=>console.log(new Date(Date.now()))}>aaa</Button>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};
export default AddTask;

