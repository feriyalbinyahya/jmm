import ReactNativeBlobUtil, { ReactNativeBlobUtilFetchPolyfill } from 'react-native-blob-util'
import notifee, {AndroidImportance} from '@notifee/react-native';
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

export async function onMessageReceived(message) {
  const { type, timestamp } = message.data;
  console.log(message);
  await notifee.requestPermission()

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });


  notifee.displayNotification({
      title: message.notification.title,
      body: message.notification.body,
      android: {
        channelId,
        importance: AndroidImportance.HIGH,
        // Reference the name created (Optional, defaults to 'ic_launcher')
        smallIcon: "ic_small_icon",
    
        // Set color of icon (Optional, defaults to white)
        color: '#FFFFFF',
      },
      data: {
        id_content: message.data.id_content,
        kategori: message.data.kategori
      }
  });
}
  
const Utils = {
    readFileBase64,
};
export default Utils;