import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  StatusBar,
  Pressable,
  Button,
  RefreshControl,
  Keyboard,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import axios from 'axios';
import {ActivityIndicator} from 'react-native-paper';
import FruitShop from '../Images/FruitShop.png';

export default function Store(props) {
  const [input, setInput] = useState('');
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  var url = 'https://api.dotshowroom.in/api/dotk/catalog/searchItems';

  const handleChange = text => {
    setLoading(true);
    axios
      .post(url, {
        page: 1,
        search_text: text,
        store_id: 2490120,
      })
      .then(data => {
        setApiData(data.data);
        console.log(data.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };

  function price(price1, price2) {
    return price1 != price2;
  }

  function clear() {
    setInput('');
    setApiData(null);
    Keyboard.dis;
  }

  const cart = name => {
    return alert(name + ' added to cart !');
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor={'#999'} barStyle={'default'} />
      <View
        style={{flexDirection: 'row', flexWrap: 'wrap', alignSelf: 'center'}}>
        <Image source={FruitShop} style={{}} />
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 30,
            fontWeight: '500',
            color: 'teal',
          }}>
          Fruits and Juices
        </Text>
        <Image source={FruitShop} style={{}} />
      </View>
      <View style={css.searchBar}>
        
        <TextInput
          placeholder="Search Fruit Name"
          onChangeText={text => [handleChange(text), setInput()]}
          style={css.searchBlock}
          value={input}
          
        />
        <TouchableOpacity onPress={() => clear()} style={css.clearButton}>
          <Text style={{color: 'black'}}>Clear</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={{flex: 1, alignSelf: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <View flex={1} style={{borderWidth: 1, margin: 5, borderRadius: 10}}>
          <ScrollView>
            <View style={css.productWarp}>
              {apiData?.items?.map(item => {
                return (
                  <View style={css.producetItemsWrap} key={item.id}>

                    <View style={css.productImageWrap}>
                      <Pressable
                        onPress={() =>
                          props.navigation.navigate('StoreItemDetails', {
                            data: item,
                          })
                        }>
                        <Image
                          style={css.productImage}
                          source={{uri: item.image_url}}
                        />
                      </Pressable>
                    </View>

                    <View style={css.productText} >
                      <View>
                        <Pressable
                          onPress={() =>
                            props.navigation.navigate('StoreItemDetails', {
                              data: item,
                            })
                          }>
                          <Text style={{fontSize: 17}}>
                            <Text style={{fontSize: 22, color: '#111'}}>
                              {item.name}
                            </Text>
                            {'\n'}
                            <Text style={{fontSize: 15}}>Category :</Text>
                            {item.category.name} {'\n'}
                            Price :{' '}
                            {price(item.price, item.discounted_price) ? (
                              <Text>
                                <Text style={{fontSize: 18, color: 'red'}}>
                                  INR {item.discounted_price}
                                </Text>
                                {'\n'}
                                <Text
                                  style={{textDecorationLine: 'line-through'}}>
                                  {' '}
                                  INR {item.price}
                                </Text>
                              </Text>
                            ) : (
                              <Text> INR {item.price}</Text>
                            )}
                          </Text>
                        </Pressable>
                      </View>
                      <Text
                        onPress={() => cart(item.name)}
                        style={css.cart}>
                        Add to cart
                      </Text>
                    </View>

                    
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const css = StyleSheet.create({
  searchBar: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignSelf: 'center',
  },
  searchLogo: {
    tintColor: '#07448e',
    alignSelf: 'center',
    width: 35,
    height: 35,
    marginRight: '4%',
  },
  searchBlock: {
    borderColor: '#999',
    borderWidth: 2,
    width: '70%',
    height: 40,
    marginRight: '4%',
    borderRadius: 5,
    paddingLeft:10
  },
  cartLogo: {},
  productWarp: {},
  producetItemsWrap: {
    flex: 1,
    flexDirection: 'row',
    borderColor: '#111',
    padding: 10,
    margin: 10,
    backgroundColor: '#999',
  },

  productImage: {
    width: 175,
    height: 175,
    alignSelf: 'center',
  },
  productText: {
    paddingHorizontal: 5,
    width: '50%',
    borderColor: '#111',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImageWrap: {
    width: '50%',
    justifyContent: 'center',
  },
  loading: {
    marginVertical: 300,
    justifyContent: 'center',
  },
  clearButton: {
    borderColor: '#999',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    margin: 2,
    padding: 2,
    height: 30,
    width: 50,
    borderRadius: 5,
    borderWidth:2
  },
  cart:{
    backgroundColor: '#e1e6e6',
    margin: 30,
    borderRadius: 10,
    height: 25,
    textAlignVertical: 'center',
    color: 'teal',
    fontWeight: 'bold',
    width: 80,
    textAlign: 'center',
  }
});
