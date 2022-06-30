import {StyleSheet} from 'react-native';

const button = StyleSheet.create({
  layout: {
    shadowColor: 'black',
    shadowRadius: 7,
    width: '50%',
    alignSelf: 'center',
    marginTop: 10,
    borderWidth: 1,
  },
  label: {
    fontSize: 13,
    color: '#FBB040',
    fontWeight: '700',
  },
});
const css = StyleSheet.create({
  dropdown: {
    marginVertical: 5,
    height: 54,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white',
  },
  placeholderStyle: {
    paddingLeft: 5,
    fontSize: 16,
    color: 'grey',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
export {button, css};
