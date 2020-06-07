import * as React from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import {LinearGradient} from 'expo-linear-gradient';

import CustomHeader from '../../components/Header'
import CustomBottomTab from '../../components/BottomTab'

const manual_data = [
  {
    url: 'https://www.commondreams.org/sites/default/files/styles/cd_large/public/headlines/cops_cops.png?itok=iWwv817T',
    timestamp: "14:34:15 UTC 06/06/2020",
    longitude: -122.4324,
    latitude: 37.78825, 
  },
  {
    url: 'https://www.commondreams.org/sites/default/files/styles/cd_large/public/headlines/cops_cops.png?itok=iWwv817T',
    timestamp: "14:34:15 UTC 06/06/2020",
    longitude: -122.4324,
    latitude: 37.79825, 
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
          {manual_data.map((marker,key) => ( 
            <Marker
              coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
              title={"Police assault"}
              description={marker.timestamp}
              key={key}
            >
              <Callout onPress={() => (this.markerClick(marker.url))}>
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
});

/*
GET request to https://activistarmor.online/api/map
Expected Response: 
{
  {
  'url': "https://activist-armor.nyc3.cdn.digitalocean.com/asdhka.mp4",
  'timestamp': '14:34:15 UTC 06/06/2020',
  'longitude': "34.324 N",
  'latitude': "87.3242 W"
  },
  {
  More of the last body for every element in the database
  }
}
*/