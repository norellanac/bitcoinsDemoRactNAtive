import React, {useContext} from 'react';
import {LoginScreen} from '../screens/LoginScreen';
import {DashboardScreen} from '../screens/DashboardScreen';
import {CoinsScreen} from '../screens/CoinsScreen';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export const Navigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="CoinsScreen" component={CoinsScreen} />
      <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
    </Stack.Navigator>
  );
};
