import React, {useEffect} from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  Button,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
  Pressable
} from 'react-native';
import {useState} from 'react';
import axios from 'axios';
import background from '../Images/background.jpg'
import cart from '../Images/cart.png'
import style from '../Components/styles';



export default function Eapp(props) {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiURL =
    'https://api.dotshowroom.in/api/dotk/catalog/getItemsBasicDetailsByStoreId/2490120?category_type=0';

  useEffect(() => {
    axios.get(apiURL).then(data => {
      setApiData(data.data);
     //console.log('first', data);
    });
  }, []);

  useEffect(() => {
    setLoading(true) 
      setTimeout(() => {
        setLoading(false)}, 2000);
  }, []);

  function price(price1,price2){
    return(
        price1!=price2
    );
}

  return (
    <View >
      <ImageBackground source={background} style={{width: '100%', height: '100%'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent:"center",
            paddingHorizontal:50,
            padding:5
            
          }}>
             <Text style={style.pageHeading}>Ecommerse Applicaion</Text>
            {/* <TouchableOpacity onPress={() => props.navigation.navigate('Cart')}>
            <Image  source={cart} style={style.cart} />
            </TouchableOpacity> */}
        </View>
        { loading? <ActivityIndicator size="large" style={style.loading}/> :
        <ScrollView showsVerticalScrollIndicator={false}>
          {apiData?.store_items?.map((item, i) => {
            return (
              <View key={i}>
                <Text style={style.cName}>
                  {item.category && item.category.name}
                </Text>
                <View style={style.productItemContainer}>
                  {item?.items?.map(productItem => {
                    return (
                      <View style={style.product} key={productItem.id}>
                        <Pressable onPress={() =>
                            props.navigation.navigate('Details', {
                              data: productItem,
                            })
                          }>
                        <Image
                          style={{height: 150, width: '100%'}}
                          source={{uri: productItem?.image_url}}
                        />
                        </Pressable>
                        <Text
                          style={{
                            fontSize: 15,
                            marginBottom: 10,
                            color: '#000',
                          }}
                          numberOfLines={1}>
                          {productItem?.name}
                        </Text>
                        <View style={style.price}>
                        {price(productItem?.price, productItem?.discounted_price) ? (
                              <View style={{flexDirection:'row',alignItems:"center"}}>
                                <Text style={{fontSize: 18, color: 'red'}}>
                                  INR {productItem?.discounted_price}
                                </Text>
                                <Text
                                  style={{textDecorationLine: 'line-through'}}>
                                  {' '}
                                  INR {productItem?.price}
                                </Text>
                              </View>
                            ) : (
                              <Text style={{fontSize: 18, color: 'black'}}> INR {productItem?.discounted_price}</Text>
                            )}
                            </View>
                        
                        <Button
                          title="Add to cart"
                        />
                      </View>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </ScrollView>
        }     
      </ImageBackground>
    </View>
  );
}