import React from 'react'
import { View,Text,Image} from 'react-native';
import { Button } from 'react-native-paper';


export default function StoreItemDetails(props) {
    const items = props?.route?.params?.data;
    console.log(props);
    
    function price(price1,price2){
      return(
          price1!=price2
      );
  }

  return (
   
         <View style={{alignItems:'center',flex:1,margin:30}}>
             <Image style={{width:175,
                            height:175,
                            alignSelf:'center',}} source={{uri:items.image_url}}
             />
             <Text style={{fontSize:30,color:'#111111'}}>{items.name}</Text>
             <Text style={{fontSize:20,margin:20}}>
              
              <Text>{items.description}</Text>
                         
            </Text>
            {price(items.price,items.discounted_price)?
                <Text>
                <Text style={{fontSize:30,color:'red'}}>INR {items.discounted_price}</Text>{"\n"} 
                <Text style={{fontSize:30,color:'#999',textDecorationLine:'line-through'}}>INR {items.price}</Text> 
                </Text>
                :
                <Text style={{fontSize:30,color:'red'}}>INR {items.price}</Text>  
            }
           <Button onPress={props.navigation.goBack}> Back </Button>
        </View>
 
     
  ); 
}