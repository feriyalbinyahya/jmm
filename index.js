/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import { onMessageReceived } from './src/utils/Utils';
import notifee, { EventType } from '@notifee/react-native';
import * as RootNavigation from './src/route/utils';

messaging().setBackgroundMessageHandler(onMessageReceived);

notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification, pressAction } = detail;
    console.log(type);
    console.log(pressAction);
  
    // Check if the user pressed the "Mark as read" action
    if (type === EventType.ACTION_PRESS) {
        console.log("pencet notif");
        handleNotificationOpen(notification.data);
  
        // Remove the notification
        await notifee.cancelNotification(notification.id);
    }
});

handleNotificationOpen = (data) => {
    if(data.kategori == "Survey"){
      RootNavigation.navigate("StartSurvei", {id: data.id_content});
    }else if(data.kategori == "Berita"){
      RootNavigation.navigate("BeritaDetail", {id: data.id_content});
    }

}

AppRegistry.registerComponent(appName, () => App);
