import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
  Platform,
} from 'react-native';
 
// for the file download
import RNFetchBlob from 'rn-fetch-blob';
 

    function imgDown(path){
        console.log(path)
        checkPermission(path);
       
    }
    
    const checkPermission = async (path) => {
    
        // Function to check the platform
        // If iOS then start downloading
        // If Android then ask for permission
     
        if (Platform.OS === 'ios') {
            console.log(path);
          downloadImage(path);
        } else {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED)  {
              // Once user grant the permission start downloading
              downloadImage(path);
            }
          } catch (err) {
            // To handle permission related exception
            console.warn(err);
          }
        }
      };

  // Main function to download the image
  const downloadImage = (path) => {
   
    
    // To add the time suffix in filename
    let date = new Date();

    // Image URL which we want to download
    let image_URL = path;    

    // Getting the extention of the file
    let ext = getExtention(image_URL);

    ext = '.' + ext[0];
    
    // Get config and fs from RNFetchBlob
    // config: To pass the downloading related options
    // fs: Directory path where we want our image to download
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
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
        // Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        alert('Image Downloaded Successfully.');
      });
  };
 
  const getExtention = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ?
             /[^.]+$/.exec(filename) : undefined;
  };

export default imgDown;