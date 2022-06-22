import React from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';
import textInput from '../../styles/textinput._css';

const Mytextinput = props => {
  return (
    <View>
      <TextInput
        label={props.label}
        value={props.value}
        onChangeText={props.onChangeText}
        mode="flat"
        outlineColor="#FBB040"
        activeOutlineColor="#506F86"
        placeholderTextColor="red"
        style={textInput.input}
        keyboardType={props.keyboardType}
        returnKeyType={props.returnKeyType}
        numberOfLines={props.numberOfLines}
        multiline={props.multiline}
        onSubmitEditing={props.onSubmitEditing}
        disabled={props.disabled}
        theme={{colors: {primary: '#FBB040',}}}
        error={props.error}
      />
    </View>
  );
};

export default Mytextinput;
