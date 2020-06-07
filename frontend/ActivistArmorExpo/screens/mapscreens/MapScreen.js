import * as React from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import {LinearGradient} from 'expo-linear-gradient';

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

export default class MapScreen extends React.Component {
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
    );
  }
  
  markerClick(url){
    this.props.navigation.navigate('View', {imageUrl: url})
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