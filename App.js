import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {store} from './src/store/configureStore';
import {persistStore} from 'redux-persist';
import ScreenStacks from './src/screens/Stacks/ScreenStacks';
import {StatusBar} from 'react-native';

const App = () => {
  const persistor = persistStore(store);

  return (
    <Provider store={store} stabilityCheck="true">
      <PersistGate persistor={persistor}>
        <StatusBar hidden />
        <NavigationContainer>
          <ScreenStacks />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
