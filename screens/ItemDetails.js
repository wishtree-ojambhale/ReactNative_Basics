import React from 'react'
import { Text, View, Image,Pressable,Button} from 'react-native';
import style from '../Components/styles';
import imgDown from './ImageDown';


export default function Details(props) {
    console.log(props);
    const pData = props?.route?.params?.data;

    function price(price1,price2){
        return(
            price1!=price2
        );
    }
    return (
        <View style={{padding:20}}>
        
        <View style={{alignItems:"center"}}>
        <Image 
            source={{uri:pData.image_url}} 
            style={{height:300, width:300,marginVertical:10}}
        />
        <Button title='Download' onPress={()=>imgDown(pData.image_url)}/>
        <Text>
            {pData.description}
        </Text>
        <Text style={{fontSize:20, fontWeight:'bold', color:'#000'}}>
            {pData.name}
        </Text>
        <View style={style.price}>
                        {price(pData?.price, pData?.discounted_price) ? (
                              <View style={{flexDirection:'row',alignItems:"center"}}>
                                <Text style={{fontSize: 18, color: 'red'}}>
                                  INR {pData?.discounted_price}
                                </Text>
                                <Text
                                  style={{textDecorationLine: 'line-through'}}>
                                  {' '}
                                  INR {pData?.price}
                                </Text>
                              </View>
                            ) : (
                              <Text style={{fontSize: 18, color: 'black'}}> INR {pData?.discounted_price}</Text>
                            )}
                            </View>
        <Button title='Back' onPress={props.navigation.goBack}>
            
        </Button>
        </View>
       
        </View>
  );
}