import React,{useEffect,useState} from 'react'
import {View,Text,ActivityIndicator,ScrollView,Image,TextInput,TouchableOpacity,Linking,alertMessage} from 'react-native';
import axios from 'axios';
import style from '../Components/styles';

export default function Anime() {

    const [loading, setLoading] = useState(false);
    const [apiData, setApiData] = useState([]);



    const apiURL = 'https://anime-facts-rest-api.herokuapp.com/api/v1';

    useEffect(()=>{
        setLoading(true);
        axios.get(apiURL).then
        (data => {
            setLoading(false);
            setApiData(data.data);
            console.log("First",data.data);

        })
        .catch(function(error){
            console.log("error",error);  
            alert("error "+error)
 
        })
    },[]);

    const webView=(name)=>{
        switch(name){
            case 'one_piece':
                Linking.openURL('https://en.wikipedia.org/wiki/One_Piece_(TV_series)');
                break;
            case 'bleach':
                Linking.openURL('https://en.wikipedia.org/wiki/Bleach_(TV_series)');
                break;
            case 'black_clover':
                Linking.openURL('https://en.wikipedia.org/wiki/Black_Clover');
                break;
            case 'dragon_ball':
                Linking.openURL('https://en.wikipedia.org/wiki/Dragon_Ball');
                break;
            case 'jujutsu_kaisen':
                Linking.openURL('https://en.wikipedia.org/wiki/Jujutsu_Kaisen');
                break;
            case 'fma_brotherhood':
                Linking.openURL('https://en.wikipedia.org/wiki/Fullmetal_Alchemist:_Brotherhood');
                break;
            case 'naruto':
                Linking.openURL('https://en.wikipedia.org/wiki/Naruto');
                break;
            case 'gintama':
                Linking.openURL('https://en.wikipedia.org/wiki/Gin_Tama');
                break;
            case 'itachi_uchiha':
                Linking.openURL('https://en.wikipedia.org/wiki/Itachi_Uchiha');
                break;
            case 'demon_slayer':
                Linking.openURL('https://en.wikipedia.org/wiki/Demon_Slayer:_Kimetsu_no_Yaiba');
                break;
            case 'attack_on_titan':
                Linking.openURL('https://en.wikipedia.org/wiki/Attack_on_Titan');
                break;
            case 'hunter_x_hunter':
                Linking.openURL('https://en.wikipedia.org/wiki/Hunter_%C3%97_Hunter');
                break;
            case 'boku_no_hero_academia':
                Linking.openURL('https://en.wikipedia.org/wiki/My_Hero_Academia');
                break;
        }
    }

  return (
    <View>
        
        <Text style={style.animeHeader}>Anime</Text>
        {loading? <ActivityIndicator size={50} style={{marginTop:250}}>

        </ActivityIndicator> :
        
        <ScrollView>
            
            <View style={{flexDirection:"row",flexWrap:"wrap",justifyContent:"space-evenly"}}>
            {apiData?.data?.map(data =>{
                return (
                       
                       <View key={data.anime_id} style={{margin:10}} >
                           <Text style={{alignSelf:"center",fontSize:20,color:'#111',fontWeight:'600'}}>
                               {data.anime_id}. {data.anime_name} 
                           </Text>
                           <TouchableOpacity onPress={() => webView(data.anime_name)}>
                               
                           <Image 
                           style={{height:300,width:150,resizeMode:"contain"}}
                           source={{uri: data.anime_img}}>
                           </Image>
                           </TouchableOpacity>
                       </View> 
                );
            })}
            </View>
        </ScrollView>
         }
    </View>
  );
}
