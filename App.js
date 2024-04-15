import 'react-native-gesture-handler';
import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginContainer from './src/screens/LoginContainer';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {store} from './src/store/configureStore';
import {persistStore} from 'redux-persist';

const Stack = createStackNavigator();

const App = () => {
  const persistor = persistStore(store);

  return (
    <Provider store={store} stabilityCheck="true">
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="LoginScreen" component={LoginContainer} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
