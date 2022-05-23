import React from 'react';
import { Text, StyleSheet } from 'react-native';
 
const Mytext = (props) => {
  return <Text style={styles.text}>{props.text}</Text>;
};
 
const styles = StyleSheet.create({
  text: {
    color: '#111825',
    fontSize: 25,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    alignSelf:"center"
  },
});
 
export default Mytext;