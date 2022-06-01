import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Button
} from 'react-native';
import Anime from '../Images/Anime.jpeg'
import Crypto from '../Images/Crypto.jpeg'
import fruits from '../Images/fruits.jpeg'
import NetInfo,{useNetInfo} from "@react-native-community/netinfo";

export default function Home(props) {


  const netInfo = useNetInfo();
  

  function internet(){
  
    alert(`Type: ${netInfo.type} \n Is Connected? ${netInfo.isConnected?.toString()}`)
  
}

  return (
   <SafeAreaView style={styles.body}>
      <StatusBar backgroundColor={'#999'}  barStyle={'default'}/>
      <Text style={styles.bodyText}> List of API's</Text>
      <ScrollView>

      <TouchableOpacity onPress={() => props.navigation.navigate('Anime')} style={styles.animeNames}>
       <ImageBackground source={Anime} style={styles.backgroundImage} resizeMode={'cover'} blurRadius={2}> 
       <Text style={styles.listName}>Anime</Text>
       </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => props.navigation.navigate('Cryptocurrency')} style={styles.animeNames}>
        <ImageBackground source={Crypto} style={styles.backgroundImage} resizeMode={'cover'} blurRadius={2}>
        <Text style={styles.listName}>Cryptocurrency</Text>
        </ImageBackground>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => props.navigation.navigate('Store')} style={styles.animeNames}>
      <ImageBackground source={fruits} style={styles.backgroundImage} resizeMode={'cover'} blurRadius={2}>
      <Text style={styles.listName}>Store</Text>
      </ImageBackground>
      </TouchableOpacity>
      <Button title='Check' onPress={()=>internet()} >
        
      </Button>
      

      </ScrollView>
    </SafeAreaView>
  
  
  
    
  );
}

const styles = StyleSheet.create({
  body: {
    margin: 10,
    flex:1,
   
  },
  bodyText: {
    alignSelf: 'center',
    fontSize: 30,
    color: '#777777',
    fontWeight: 'bold',
    marginBottom:10
  },
  listName: {
    fontSize: 30,
    color: 'white',
    margin: 5,
    alignSelf:'center',
    fontWeight:"700",
  },
  animeNames:{
    margin:10,

  },
  backgroundImage:{
    flex: 1,
    justifyContent: "center",
    height:170,

  }
});
