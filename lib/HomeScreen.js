import AsyncStorage from '@react-native-async-storage/async-storage'
import React,{useEffect,useState} from 'react'
import {Text,View,StyleSheet,TextInput,ImageBackground} from 'react-native'
import {Button} from 'react-native-paper' 
//import background from './images/background.jpg'

function HomeScreen(props) {

  const [name,setName] = useState('');
  const [age,setAge] = React.useState('');

  useEffect(()=>{
    getData();
  },[]);

  const getData = () => {
    try{
      AsyncStorage.getItem('UserData')
      .then(value => {
        if(value != null){
          let user = JSON.parse(value);
          setName(user.Name);
          setAge(user.Age); 
        }
     })
    }catch(error){
        console.log(error);
    }
  }
  const updateData = async () => {
    if(name.length == 0){
      alert('Enter Name')
    }
    else{
      try{
        var user ={
          Name : name
        }
        await AsyncStorage.mergeItem('UserData',JSON.stringify(user));
        alert('Success, name updated !')
      
      }catch(error){
        console.log(error);
      }
    }
  }
  const ResetData = async () => {
    try{
        await AsyncStorage.removeItem('UserName');
        props.navigation.navigate('Login');
      }catch(error){
        console.log(error);
      }
      
     
  }
  

  return (
    <View style={styles.body}>
      <ImageBackground  resizeMode="cover" style={styles.image}>
        <Text style={styles.text}>
       Hello {name}
        </Text>
        <Text style={styles.text}>
       Your age is  {age}
        </Text>
        <TextInput  placeholder='Enter Name' value={name} onChangeText={(value)=> setName(value)} style={styles.input}/>
        <Button style={styles.buttons} onPress={updateData}>Update</Button>
        <Button style={styles.buttons} onPress={ResetData}>Reset</Button>
        </ImageBackground>
    </View>
  )
}
 const styles = StyleSheet.create({
   body:{
    margin:5,
    flex:1
    

   },
   input:{
    backgroundColor:"#ffffff",
    width:300,
    alignSelf:"center",
    textAlign:'center',
    marginBottom:20,
    fontSize:20,
    marginTop:130,
    borderRadius:10,
    borderWidth:1,
    color:'black',

   },
   buttons:{
    borderWidth:1,backgroundColor:'#999999',width:100,alignSelf:"center"
   },
   text:{
    alignSelf:'center',fontSize:50
   },
   image: {
    flex:1,
    justifyContent: "center"
  },
 });
export default HomeScreen