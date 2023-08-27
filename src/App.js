import { useEffect, useState } from 'react'
import { NativeBaseProvider, Text } from "native-base";
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/es/integration/react";
import { persistor, store } from './redux/store';
import { colorModeManager, config, theme } from './theme';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

import AppRoute from './route';
import './translation'
import { onMessageReceived } from './utils/Utils';

function App() {
  //useEffect(() => {
    //messaging().onMessage(onMessageReceived);
  //}, []);

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
