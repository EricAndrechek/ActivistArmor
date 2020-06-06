import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

import {Header} from 'react-native-elements'
import GestureRecognizer from 'react-native-swipe-gestures';

import MapView, {Marker} from 'react-native-maps';

import {connect} from 'react-redux';


import CustomHeader from '../components/Header'

const data = [
  {
    lat: 37.78825, 
    long: -122.4324,
    title: "mark1",
    description: "descrip1",
    id: 1,
  },
  {
    lat: 37.79825, 
    long: -122.4324,
    title: "mark2",
    description: "descrip2",
    id: 2,
  }
]

class MapScreen extends React.Component {
  render(){
    return (
      <GestureRecognizer style={styles.container} onSwipeRight={this._onSwipeRight}>
        <CustomHeader nav={this.props.navigation} title={"Map"}/>
        <MapView
        style={styles.container}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {data.map(marker => ( 
            <Marker
              coordinate={{latitude: marker.lat, longitude: marker.long}}
              title={marker.title}
              description={marker.description}  
              keyExtractor={marker => marker.id}
            />
          ))}
        </MapView>
      </GestureRecognizer>
    );
  }
  
  _onSwipeRight = gestureState =>{
    this.props.navigation.navigate('Feed')
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
    color: 'black',
    fontSize: 20,
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);