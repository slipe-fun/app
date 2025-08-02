import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../constants/routes';
import SettingsScreen from 'src/screens/settings';

const Stack = createNativeStackNavigator();

const SettingsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'simple_push',
        presentation: 'card',
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name={ROUTES.SETTINGS_MAIN} component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default SettingsNavigator; 