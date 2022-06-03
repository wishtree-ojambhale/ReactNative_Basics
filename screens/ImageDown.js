import {
  Alert,
  PermissionsAndroid,
  Platform,
  Linking
} from 'react-native';
 
//for the file download
import RNFetchBlob from 'rn-fetch-blob';
 

    function imgDown(path){
        console.log(path)
        checkPermission(path);
    }
    
    const checkPermission = async (path) => {
  
        //Function to check the platform
        //If iOS then start downloading
        //If Android then ask for permission
     
        if (Platform.OS === 'ios') {
            console.log(path);
          downloadImage(path);
        } 
        else {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            );
            // switch(granted){
            //   case 'granted':{
            //     console.log(`If permission is granted :${granted}`);
            //     alert("Done");
            //     //Once user grant the permission start downloading
            //     downloadImage(path);
            //     break;
            //   }

            //   case 'never_ask_again':{
            //     console.log(`If permission is not granted :${granted}`);
            //   Alert.alert(
            //     'Permission Request',
            //     'Please allow Media permission to download the Image',
            //     [
            //       {
            //         text: 'Go to Settings',
            //         onPress: () => {
            //           Linking.openSettings();
            //         },
            //       },
            //       {
            //         text: 'Cancel',
            //         style: 'cancel',
            //       },
            //     ],
            //     { cancelable: false },
            //   );
            //   break;
            //   }
            // }
            if (granted ==  PermissionsAndroid.RESULTS.GRANTED)  {
              console.log(`If permission is granted :${granted}`);
              alert("Done");
              //Once user grant the permission start downloading
              downloadImage(path);
            }
           if ( granted ==  PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN){
            console.log(`If permission is not granted :${granted}`);
              Alert.alert(
                'Permission Request',
                'Please allow Media permission to download the Image',
                [
                  {
                    text: 'Go to Settings',
                    onPress: () => {
                      Linking.openSettings();
                    },
                  },
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                ],
                { cancelable: false },
              );
            }
          } catch (err) {
            //To handle permission related exception
            console.warn(err);
          }
        }
      };
      

  //Main function to download the image
  const downloadImage = (path) => {
    console.log('downloading.....')
    //add's the time suffix in filename
    let date = new Date();

    //Image URL which we want to download
    let image_URL = path;    

    //Getting the extention of the file
    let ext = getExtention(image_URL);

    ext = '.' + ext[0];
    
    //Get config and fs from RNFetchBlob
    //config: To pass the downloading related options
    //fs: Directory path where we want our image to download
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        //Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' + 
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        //Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        alert('Image Downloaded Successfully.');
      });
  };
 
  const getExtention = filename => {
    //To get the file extension
    return /[.]/.exec(filename) ?
             /[^.]+$/.exec(filename) : undefined;
  };

export default imgDown;