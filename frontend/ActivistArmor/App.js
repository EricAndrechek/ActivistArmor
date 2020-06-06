import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './navigation/BottomTabNavigator';
const Stack = createStackNavigator();

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


export default function App(props) {
  return (
    <Provider store = {store}>
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Root" component={BottomTabNavigator} />
          </Stack.Navigator>
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
