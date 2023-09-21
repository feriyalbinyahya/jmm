import { useEffect, useState } from 'react'
import { NativeBaseProvider, Text } from "native-base";
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/es/integration/react";
import { persistor, store } from './redux/store';
import { colorModeManager, config, theme } from './theme';
import notifee, { EventType } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import * as RootNavigation from '../src/route/utils';

import AppRoute from './route';
import './translation'
import { onMessageReceived } from './utils/Utils';

function App() {
  const [loading, setLoading] = useState(true);

  async function bootstrap() {
    const initialNotification = await notifee.getInitialNotification();

    if (initialNotification) {
      handleNotificationOpen(initialNotification.notification.data);
    }
  }

  useEffect(() => {
    messaging().onMessage(onMessageReceived);
  }, []);

  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail);
          handleNotificationOpen(detail.notification.data);
          break;
      }
    });
  }, []);

  useEffect(() => {
    bootstrap()
      .then(() => setLoading(false))
      .catch(console.error);
  }, []);

  if (loading) {
    return null;
  }

  handleNotificationOpen = (data) => {
    if(data.kategori == "Survey"){
      RootNavigation.navigate("StartSurvei", {id: data.id_content});
    }else if(data.kategori == "Berita"){
      RootNavigation.navigate("BeritaDetail", {id: data.id_content});
    }

  }

  return (
    <NativeBaseProvider theme={theme} config={config} colorModeManager={colorModeManager}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppRoute />
        </PersistGate>
      </Provider>
    </NativeBaseProvider>
  )
}



export default App;
