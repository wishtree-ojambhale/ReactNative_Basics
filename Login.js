import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useEffect} from 'react'
import {View,Text,SafeAreaView,StyleSheet,TextInput} from 'react-native'
import {Button} from 'react-native-paper'


function Login(props) {
  const [name,setName] = React.useState('');
  const [age,setAge] = React.useState('');
  useEffect(() =>{
    getData()
  },[]);

  const getData=()=>{
    try{
    AsyncStorage.getItem('UserData')
    .then(value => {
      if(value != null){
        props.navigation.navigate('HomeScreen');
      }
    })
  }catch(error){
    console.log(error);
  }
  }

  const setData = async () => {
    if(name.length == 0 || age.length == 0){
      alert('Enter Name and Age')
    }
    else{
      try{
        var user ={
          Name: name,
          Age: age,
        }
        await AsyncStorage.setItem('UserData',JSON.stringify(user));
        props.navigation.navigate('HomeScreen');
      
      }catch(error){
        console.log(error);
      }
    }
  }
  return (
    <SafeAreaView style={style.body}>
      <Text style={style.text}>
        Async Storage
      </Text>
        
        <TextInput  placeholder='Enter Name' onChangeText={(value)=> setName(value)} style={style.input}/>
        <TextInput  placeholder='Enter Age' onChangeText={(value)=> setAge(value)} style={style.input}/>
        <Button style={style.button} color='black' onPress={setData}>Login</Button>
        <Button style={style.button} color='black' onPress={()=> props.navigation.navigate('Signup')}>Signup</Button>
       
       
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  body:{
    backgroundColor:'skyblue',
    flex:1,justifyContent:"center"
  },
  text:{
    fontSize:30,
    alignSelf:"center",
    color:"#111111",
    marginBottom:100,
  },
  input:{
    backgroundColor:"#ffffff",
    width:300,
    alignSelf:"center",
    textAlign:'center',
    marginBottom:20,
    fontSize:20,
    
    borderRadius:10,
    borderWidth:1,
    color:'black',

  },
  button:{
    backgroundColor:"#9999",width:100,alignSelf:"center",margin:5,
    color:'#1111111'
  },
});

export default Login;