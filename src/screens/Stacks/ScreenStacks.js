import React from 'react';
import {useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import LoginContainer from '../LoginContainer';
import StoreContainer from '../StoreContainer';

const Stack = createStackNavigator();

const ScreenStacks = () => {
  const {userAuth} = useSelector(state => {
    return {userAuth: Object.values(state.cartReducer.auth)?.[0]};
  });

  return (
    <Stack.Navigator>
      {!userAuth?.uid ? (
        <Stack.Screen
          name="LoginScreen"
          component={LoginContainer}
          options={{headerShown: false}}
        />
      ) : (
        <Stack.Screen
          name="StoreContainer"
          component={StoreContainer}
          options={{headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
};

export default ScreenStacks;
