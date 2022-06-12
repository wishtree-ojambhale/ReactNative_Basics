import React from 'react'
import {View,Text,ScrollView} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import homeCss from '../styles/homeCss'
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

function Todo(props) {
  const t = props?.data;
  return (
    <SafeAreaView style={homeCss.body}>
    <LinearGradient colors={['#2F3C4F', '#506F86', '#FBB040']} style={{flex:1}}>
         {/* <LinearGradient colors={['pink', 'skyblue', 'white']} style={{flex:1}}> */}
    <View style={{justifyContent:'space-between',flex:1}}>
      <View style={{alignSelf:"center"}}>
          <Text style={{fontSize:25,color:"#FBB040",fontWeight:'700'}}>
              TODO LIST
          </Text>
      </View>
        <ScrollView style={{flex:1}}>
          <Text style={{color:'white'}}>
            {/* {t.title} */}
          </Text>
          <Text style={{color:'white'}}> 
                {/* aaaa */}
          </Text>
                    </ScrollView>
      <View style={{alignSelf:'flex-end',padding:10,borderRadius:10}}>
          <Button  color='#506F86' mode="contained" onPress={() => props.navigation.navigate('AddTask')}>
                  <Text style={{color:'#FBB040',fontWeight:'700'}}>Add</Text>
          </Button> 
      </View>
    </View>
    </LinearGradient>
    </SafeAreaView>
  )
}

export default Todo;