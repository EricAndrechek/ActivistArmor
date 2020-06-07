import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

import {Header} from 'react-native-elements'
import GestureRecognizer from 'react-native-swipe-gestures';

import MapView, {Marker, Callout} from 'react-native-maps';
import {LinearGradient} from 'expo-linear-gradient';

import {connect} from 'react-redux';


import CustomHeader from '../../components/Header'

import CustomBottomTab from '../../components/BottomTab'
const manual_data = [
  {
    lat: 37.78825, 
    long: -122.4324,
    title: "mark1",
    description: "descrip1",
    url: 'https://thumbs.dreamstime.com/b/spring-flowers-blue-crocuses-drops-water-backgro-background-tracks-rain-113784722.jpg',
    id: 1,
  },
  {
    lat: 37.79825, 
    long: -122.4324,
    title: "mark2",
    description: "descrip2",
    url: 'https://thumbs.dreamstime.com/b/spring-flowers-blue-crocuses-drops-water-backgro-background-tracks-rain-113784722.jpg',
    id: 2,
  }
]

class MapScreen extends React.Component {
  
  state = {
    data: []
  }

  componentDidMount(){
    // this.receiveData()
  }
  
  receiveData = () => {
    fetch('https://activistarmor.online/api/map', {
      method: 'GET'
    }).then(res => res.json()).then(res => {
      this.setState({ data: res })
    })
  }

  render(){
    return (
      <GestureRecognizer style={styles.container} onSwipeRight={this._onSwipeRight}>
        
        <LinearGradient colors={['#2193b0', '#6dd5ed']} 
          style={styles.container}>
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
            {manual_data.map(marker => ( 
              <Marker
                coordinate={{latitude: marker.lat, longitude: marker.long}}
                title={marker.title}
                description={marker.description}  
                keyExtractor={marker => marker.id}
              >
                <Callout tooltip style={styles.customView} onPress={() => (this.markerClick(marker.url))}>
                </Callout>
              </Marker>
            ))}
          </MapView>
          <CustomBottomTab nav={this.props.navigation}/>
        </LinearGradient>
      </GestureRecognizer>
    );
  }
  
  markerClick(url){
    this.props.navigation.navigate('View', {imageUrl: url})
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