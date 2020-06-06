import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FeedScreen from './screens/FeedScreen';
import MapScreen from './screens/MapScreen';
import CaptureScreen from './screens/postscreens/capturescreen';

const BottomTab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <BottomTab.Navigator initialRouteName={"Feed"}>
          <BottomTab.Screen
            name="Feed"
            component={FeedScreen}
            options={{
              title: 'Feed',
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
          />
        </BottomTab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
