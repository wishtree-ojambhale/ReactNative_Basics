import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { color } from 'react-native-reanimated';
 
const Mytextinput = (props) => {

  return (
    <View
      style={{
        borderColor: '#007FFF',
        width:320,margin:5,alignSelf:"center"
      }}>
        
      <TextInput
      
        underlineColorAndroid="transparent"
        placeholder={props.placeholder}
        placeholderTextColor="#007FFF"
        keyboardType={props.keyboardType}
        onChangeText={props.onChangeText}
        returnKeyType={props.returnKeyType}
        numberOfLines={props.numberOfLines}
        multiline={props.multiline}
        onSubmitEditing={props.onSubmitEditing}
        style={props.style}
        blurOnSubmit={false}
        value={props.value}
        label={props.label}
        mode="outlined"
        disabled={props.disabled}
        theme={{colors: {primary: '#f05555',}}}
        
        // error={true}
  
      />
    </View>
  );
};
 
export default Mytextinput;