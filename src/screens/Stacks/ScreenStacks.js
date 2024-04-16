import React from 'react';
import {useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import LoginContainer from '../LoginContainer';
import StoreContainer from '../StoreContainer';
import ItemDetailsContainer from '../ItemDetailsContainer';
import QRCameraViewContainer from '../QRCameraViewContainer';

const Stack = createStackNavigator();

const ScreenStacks = () => {
  const {userAuth} = useSelector(state => {
    return {userAuth: Object.values(state.cartReducer.auth)?.[0]};
  });

  return (
    <Stack.Navigator
      initialRouteName={!userAuth?.uid ? 'LoginScreen' : 'StoreContainer'}>
      <Stack.Screen
        name="LoginScreen"
        component={LoginContainer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StoreContainer"
        component={StoreContainer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ItemDetailsContainer"
        component={ItemDetailsContainer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="QRCameraViewContainer"
        component={QRCameraViewContainer}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default ScreenStacks;
