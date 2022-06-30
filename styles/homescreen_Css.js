import {StyleSheet} from 'react-native';

const homeCss = StyleSheet.create({
  body: {
    flex: 1,
  },
  heading: {
    fontSize: 25,
    color: '#FBB040',
    fontWeight: '700',
  },
  titleText: {
    fontSize: 25,
    color: 'white',
    fontWeight: '600',
  },
  note: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    flex: 1,
    borderWidth: 2,
    margin: 10,
    borderRadius: 10,
    backfaceVisibility: 'visible',
    borderColor: '#506F86',
  },
  displayMsg: {
    fontSize: 20,
    padding: 10,
    color: '#FBB040',
    fontWeight: '700',
    flex: 1,
    alignSelf: 'center',
    textAlignVertical: 'center',
  },

  task: {
    color: 'white',
    fontSize: 15,
  },
  category: {
    fontSize: 15,
    color: 'white',
    fontWeight: '600',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  buttons: {
    paddingLeft: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginBottom: 10,
  },
});

export default homeCss;
