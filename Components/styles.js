import {StyleSheet} from 'react-native'


const style = StyleSheet.create({
  cart:{
    tintColor:'black',
    alignSelf:'center'
  },
  pageHeading: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 22,
    justifyContent:'space-evenly',

  },
  cName: {
    textAlign: 'center',
    fontSize: 19,
    textDecorationLine: 'underline',
    color: '#000',
    padding: 10,
    backfaceVisibility:"visible",
  },
  productItemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  product: {
    width: '44%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    marginHorizontal: 10,
    marginVertical: 10,
    borderStyle: 'dashed',
  },
  price: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
  },
  oPrice: {
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  dPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  loading:{
    marginVertical:300,
    justifyContent: "center",
  },

  animeHeader:{
    margin:10,
    alignSelf:'center',
    fontSize:30,
    color:'#000',
  }

  });
   
  export default style;
