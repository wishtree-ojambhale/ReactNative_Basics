import React from "react";
import { Button, PermissionsAndroid, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";

// const requestCameraPermission = async () => {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.CAMERA,
//       {
//         title: "Cool Photo App Camera Permission",
//         message:
//           "Cool Photo App needs access to your camera " +
//           "so you can take awesome pictures.",
//         buttonNeutral: "Ask Me Later",
//         buttonNegative: "Cancel",
//         buttonPositive: "OK"
//       }
//     );
    
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log("You can use the camera");
//     } 
//       if(granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {

//       console.log(granted);
//       console.log("Camera permission denied");
//     }
//   } catch (err) {
//     console.warn(err);
//   }
// };
const requestReadCylendar= async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CALENDAR,
      {
        title: "Cool Photo App Camera Permission",
        message:
          "Cool Photo App needs access to your camera " +
          "so you can take awesome pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera");
    } 
      if(granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {

      console.log(granted);
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

const Camera = () => (
  <View style={styles.container}>
    <Text style={styles.item}>Try permissions</Text>
    {/* <Button title="request permissions" onPress={requestCameraPermission} /> */}
    <Button title="request permissions" onPress={requestReadCylendar} />
    
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#ecf0f1",
    padding: 8
  },
  item: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default Camera;