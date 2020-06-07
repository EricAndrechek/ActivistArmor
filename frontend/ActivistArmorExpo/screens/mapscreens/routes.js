

import React from 'react';

import MapScreen from './MapScreen';
import ViewScreen from './ViewScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createBottomTabNavigator();
export default function Maps() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={"Map"} 
    tabBarOptions={{
      indicatorContainerStyle:{
        opacity: 0,
      }
    }}>
      <Stack.Screen name="Map" component={MapScreen} options={{tabBarVisible: false}}/>
      <Stack.Screen name="View" component={ViewScreen} options={{tabBarVisible: false}}/>
    </Stack.Navigator>
  );
}