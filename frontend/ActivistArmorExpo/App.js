import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from "react-native-elements";
import {createStackNavigator} from 'react-navigation-stack';

import FeedScreen from './screens/FeedScreen';
import MapScreen from './screens/mapscreens/MapScreen';
import PostScreen from './screens/postscreens/PostScreen';
import ViewScreen from './screens/mapscreens/ViewScreen';

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

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Stack = createMaterialTopTabNavigator();
function Maps() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={"Map"} 
    tabBarOptions={{
      indicatorContainerStyle:{
        opacity: 0,
      }
    }}>
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="View" component={ViewScreen} />
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store = {store}>
      <View style={styles.container}>
        <NavigationContainer>
          <BottomTab.Navigator 
            initialRouteName={"Feed"}
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                size = 40;
                let iconName;
                if (route.name === 'Feed') {
                  iconName = 'ios-home';
                  return <Icon name={iconName} size={size} color={color} type='ionicon'/>;
                } else if (route.name === 'Map') {
                  iconName = 'map';
                  return <Icon name={iconName} size={size} color={color} type='material'/>;
                } else if (route.name === 'Post') {
                  iconName = 'camera';
                  return <Icon name={iconName} size={size} color={color} type='material'/>;
                }
              },
            })}
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
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabBar: {
    backgroundColor: '#6dd5ed',
  }
});
