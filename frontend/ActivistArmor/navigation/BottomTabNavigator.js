import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import * as React from 'react';

import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import CaptureScreen from '../screens/postscreens/capturescreen';


const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <BottomTab.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: 'Map',
        }}
      />
      <BottomTab.Screen
        name="Post"
        component={CaptureScreen}
        options={{
          title: 'Post',
        }}
      />
    </BottomTab.Navigator>
  );
}