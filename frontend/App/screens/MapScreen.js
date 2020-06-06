import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import {Header} from 'react-native-elements'

import MapView, {Marker} from 'react-native-maps';


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
      <View>
        <Header 
            backgroundColor='#fafafa'
            centerComponent={{ text: "Map", style: styles.headerText}}
            containerStyle={{
              height: 60,
            }}
        />
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
      </View>
    );
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


export default MapScreen;