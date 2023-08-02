import { useEffect, useState } from 'react'
import { NativeBaseProvider, Text } from "native-base";
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/es/integration/react";
import { persistor, store } from './redux/store';
import { colorModeManager, config, theme } from './theme';

import AppRoute from './route';
import './translation'

function App() {

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
