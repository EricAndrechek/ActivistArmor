import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FeedScreen from './screens/FeedScreen';
import PostScreen from './screens/PostScreen';
import Maps from './screens/mapscreens/routes';

const BottomTab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <BottomTab.Navigator 
          initialRouteName={"Feed"}
          tabBarOptions={{
            showLabel: false,
            style: styles.tabBar,
          }}
          >
          <BottomTab.Screen
            name="Feed"
            component={FeedScreen}
          />
          <BottomTab.Screen
            name="Map"
            component={Maps}
          />
          <BottomTab.Screen
            name="Post"
            component={PostScreen}
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
  tabBar: {
    backgroundColor: '#6dd5ed',
    height: 0,
  }
});
