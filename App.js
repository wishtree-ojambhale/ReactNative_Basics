

import React,{useState,useEffect} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,Button
} from 'react-native';


const App= () => {
 
const [count, setCount] = useState(0);
const [data, setData] = useState("");
const [flag, setFlag] = useState(false);
const [flag1, setFlag1] = useState(false);

useEffect(()=>{
  count > 0 ? setFlag1(false):setFlag1(true)
  if(count >= 10){
    setData("Count limit reached")
    setFlag(true)
  }
  if(count < 10){
    setFlag(false)
  }
  
})

  return (
    <SafeAreaView style={css.body}>
      <Text style={css.text}> State Management</Text>
      <Text style={css.counter}>{count}</Text>
     <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
       <Button disabled={flag} onPress={()=>setCount(count+1)} title='Increment'/>
      {count <10 ? <></>: <Text>{alert(data)}</Text> }  
      <Button disabled={flag1} onPress={()=>setCount(count-1)} title='Decrement'/>
      </View>
    </SafeAreaView>
  );
};


const css = StyleSheet.create({

  text : {
    fontSize:40,alignSelf:'center',
    color:'black'
  },
  body:{
    margin:10,
    borderWidth:2,
    flex:1,
    padding:5
  },
  counter:{
    color:'red',fontSize:40,alignSelf:'center',
  },
  
})


export default App;







