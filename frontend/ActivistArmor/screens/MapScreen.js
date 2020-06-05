import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

import GestureRecognizer from 'react-native-swipe-gestures';

import MapView from 'react-native-maps';

import {connect} from 'react-redux';

class MapScreen extends React.Component {
  render(){
    return (
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <GestureRecognizer style={styles.container} onSwipeRight={this._onSwipeRight}>
        <Header 
            backgroundColor='#E07A5F'
            centerComponent={{ text: "Header", style: styles.headerText}}
          ></Header>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <TouchableOpacity onPress={() => this.props.increaseCounter()}>
            <Text style={styles.getStartedText}>
              CountUp
            </Text>
          </TouchableOpacity>
          <Text style={styles.getStartedText}>{this.props.counter}</Text>
        </ScrollView>
      </GestureRecognizer>
    );
  }
  
  _onSwipeRight = gestureState =>{
    this.props.navigation.navigate('Home')
  }  
}


function mapStateToProps(state){
  return{
    counter:state.counter
  }
}

function mapDispatchToProps(dispatch){
  return{
    increaseCounter: () => dispatch({type:'INCREASE_COUNTER'}),
    decreaseCounter: () => dispatch({type: 'DECREASE_COUNTER'}),
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 30,
  },
  headerText:{
    color: '#F4F1DE',
    fontSize: 20,
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);