import ReactNativeBlobUtil from 'react-native-blob-util'
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

readFileBase64 = async(filePath) => {
    if(!filePath){
      return null
    }
    const data = await ReactNativeBlobUtil.fs.readFile(filePath, 'base64');
    const file = `${data}`;
    return file;
  }


export const getTokenNotification = async () => {
  await messaging().registerDeviceForRemoteMessages();
  const token = await messaging().getToken();
  return token;
}

export function onMessageReceived(message) {
  const { type, timestamp } = message.data;
  console.log(message.data);

  notifee.displayNotification({
      title: 'Small Icon',
      body: 'A notification using the small icon!.',
      android: {
        // Reference the name created (Optional, defaults to 'ic_launcher')
        smallIcon: 'ic_small_icon',
    
        // Set color of icon (Optional, defaults to white)
        color: '#9c27b0',
      },
  });
}
  
const Utils = {
    readFileBase64,
};
export default Utils;