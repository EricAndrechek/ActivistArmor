

import React, { Component } from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import CaptureScreen from './capturescreen';
import UploadScreen from './uploadscreen';
import PreviewPicture from './previewpicture';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Stack = createMaterialTopTabNavigator();

export default function PostScreens() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Capture"
        component={CaptureScreen}
      />
      <Stack.Screen
        name="Upload"
        component={UploadScreen}
      />
    </Stack.Navigator>
  );
};