import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../constants/routes';
import { CaptureScreen, EditorScreen } from 'src/screens';

const Stack = createNativeStackNavigator();

const EditorNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'simple_push',
        presentation: 'card',
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name={ROUTES.PUBLISH_CAPTURE} component={CaptureScreen} />
      <Stack.Screen name={ROUTES.PUBLISH_EDITOR} component={EditorScreen} />
    </Stack.Navigator>
  );
};

export default EditorNavigator; 