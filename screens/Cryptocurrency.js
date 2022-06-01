import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import {Headline, Paragraph} from 'react-native-paper';
import cryptoBackground from '../Images/cryptoBackground.jpeg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNetInfo} from '@react-native-community/netinfo';

export default function Animals() {
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState([]);

  const netInfo = useNetInfo();

  //set data in AsyncStorage 
  const storeData1 = async (key, value) => {
    await AsyncStorage.setItem(key, value);
  };

  const apiURL = 'https://api.coincap.io/v2/markets';

  //retrive data from AsyncStorage
  const retrieveData = async () => {
    try {   
      const data = await AsyncStorage.getItem('@apiData');
      setApiData(JSON.parse(data));
      setLoading(false);
    } catch (error) {
      console.log('error :', error);    
    } 
  };

  useEffect( () => {
    setLoading(true);
    retrieveData();
    axios
      .get(apiURL)
      .then(data => {
        setLoading(false);
        setApiData(data.data);
        storeData1('@apiData', JSON.stringify(data.data));
      })
      .catch(
        error => console.log(error)||alert('No internet connection'));
      
  }, []);

  return (
    <View flex={1} style={{backgroundColor: '#b18652'}}>
      <Headline
        style={{
          alignSelf: 'center',
          margin: 10,
          fontWeight: '700',
          color: 'white',
          fontSize: 30,
        }}>
        {' '}
        Market exchanges
      </Headline>
      <ImageBackground
        flex={1}
        source={cryptoBackground}
        blurRadius={1}
        resizeMode={'cover'}>
        {loading ? (
          <ActivityIndicator
            size={50}
            style={{marginTop: 250}}></ActivityIndicator>
        ) : (
          <ScrollView>
            <Paragraph style={{margin: 20, color: 'white'}}>
              Take a closer look into exchanges with the /markets endpoint.
              Similar to the /exchanges endpoint, we strive to offer
              transparency into how real-time our data is with a key identifying
              when the market was last updated. For a historical view on how a
              market has performed, see the /candles endpoint. All market data
              represents actual trades processed, orders on an exchange are not
              represented. Data received from individual markets is used to
              calculate the current price of an asset.
            </Paragraph>
            {apiData?.data?.map(data => {
              return (
                <View key={data.updated} style={{margin: 5, padding: 10}}>
                  <Text style={styles.title}>Rank: {data.rank}</Text>
                  <Text style={styles.title}>Name: {data.baseSymbol}</Text>
                  <Text style={{fontSize: 20, color: 'white'}}>
                    Price Quote : {data.priceQuote}
                  </Text>
                  <Text style={{fontSize: 20, color: 'white'}}>
                    Price USD : {data.priceUsd}
                  </Text>
                  <Text style={{fontSize: 20, color: 'white'}}>
                    Volume Usd 24 hr : {data.volumeUsd24Hr}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        )}
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 25,
  },
});
