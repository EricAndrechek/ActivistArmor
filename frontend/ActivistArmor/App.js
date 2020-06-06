import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {createStackNavigator} from 'react-navigation-stack';

import FeedScreen from './screens/FeedScreen';
import MapScreen from './screens/MapScreen';
import PostScreens from './screens/postscreens/routes';

const BottomTab = createBottomTabNavigator();

import { createStore } from 'redux';
import {Provider} from 'react-redux';

const initialState = {
  counter : 0
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case 'INCREASE_COUNTER':
      return{counter:state.counter+1}
  }
  return state
}

const store = createStore(reducer);


export default function App() {
  return (
    <Provider store = {store}>
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
              component={PostScreens}
            />
          </BottomTab.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
