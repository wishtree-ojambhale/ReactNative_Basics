import React,{useEffect} from 'react'
import {View,Text,SafeAreaView} from 'react-native'

function Signup(props) {
  return (
    <SafeAreaView>
      <Text>
        Signup
      </Text>
      
      <Text onPress={props.navigation.goBack} style={{alignSelf:'center'}}>
      Back  
      </Text>
    </SafeAreaView>
  )
}

export default Signup;