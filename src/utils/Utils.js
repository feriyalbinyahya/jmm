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

export const formatTimeByOffset = (dateString, offset) => {
  // Params:
  // How the backend sends me a timestamp
  // dateString: on the form yyyy-mm-dd hh:mm:ss
  // offset: the amount of hours to add.

  // If we pass anything falsy return empty string
  if (!dateString) return '';
  if (dateString.length === 0) return '';

  // Step 1: Parse the backend date string

  // Get Parameters needed to create a new date object
  let date = new Date(dateString);
  const milliseconds = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  );
  const localTime = new Date(milliseconds);
  console.log(localTime)
  const newDateString = localTime
    .toISOString()
    .replace('T', ' ')
    .slice(0, 16);
  // Step 1: Parse the backend date string

  return `${newDateString}`;
};
  
const Utils = {
    readFileBase64,
};
export default Utils;