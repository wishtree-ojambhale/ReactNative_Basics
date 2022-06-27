import React,{useEffect} from 'react'
import {Button,View} from 'react-native';
import PushNotification, {Importance} from 'react-native-push-notification';


const Home = () => {

    useEffect(()=>{
        PushNotification.createChannel(
            {
              channelId: "channel-id", // (required)
              channelName: "My channel", // (required)
              channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
              playSound: false, // (optional) default: true
              soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
              importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
              vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
            },
            
          );
    })

    const scheduleNotif = () =>{
        console.log("DONEEEE")
        PushNotification.localNotificationSchedule({
            //... You can use all the options from localNotifications
            message: "My Notification Message", // (required)
            date: new Date(Date.now() + 60 * 1000), // in 60 secs
            allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
            channelId: "channel-id",
            repeatTime: 1, 
          });
    }

  return (
    <View>
        <Button title='Schedule Notif' onPress={()=>scheduleNotif()}></Button>
    </View>
  )
}

export default Home;