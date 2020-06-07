
import * as React from 'react';
import {ImageBackground, Text, TouchableOpacity, Image, View, StyleSheet, KeyboardAvoidingView } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {connect} from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
//import { TouchableOpacity } from 'react-native-gesture-handler';

import {LinearGradient} from 'expo-linear-gradient';
import CustomHeader from '../../components/Header'
import CustomText from '../../components/TextField'

class PostScreen extends React.Component {

  state = {
    image: null,
    address: '',
    lat: null,
    long: null
  };

  render() {
    let { image } = this.state;

    return (
      <LinearGradient colors={['#2193b0', '#6dd5ed']} 
      style={styles.container}>
        <CustomHeader nav={this.props.navigation} title={"Post"}/>
        <View style={{ flex: 1 }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', margin: 10 }}>
            {
              image ?
              <Image source={{ uri: image }} style={styles.emptyPhoto} />
              : 
              <Image source={
                require('../../assets/images/camera.png')
              } style={styles.emptyPhoto} />
            }  
            <View style={{ flex: 2 }}>
              <TouchableOpacity onPress={this._pickImage} style={styles.infoCard}>
                <Text style={styles.infoCardText}>Choose a Media File</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._takePhoto} style={styles.infoCard}>
                <Text style={styles.infoCardText}>Take a photo</Text>
              </TouchableOpacity>
            </View>
          </View>

          <CustomText label={"Caption"}/>
          <GooglePlacesAutocomplete
            placeholder='Where did this happen?'
            fetchDetails={true}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              const coords = details.geometry.location
              this.setState({ address: details.formatted_address, lat: coords.lat, long: coords.lng })
              console.log(this.state.lat);
            }}
            placeholderTextColor={'#fafafa'}
            styles={{ 
              textInputContainer: { 
                backgroundColor: 'transparent',
                borderTopWidth: 0,
                borderBottomWidth: 0,

              },
              textInput: {
                color: '#fafafa',
                backgroundColor: 'transparent',
                borderBottomWidth: 0.5,
                borderBottomColor: '#999',
                fontSize: 16,
              },
              container: {
                marginHorizontal: 10
              }
            }}
            query={{
              key: 'AIzaSyCIX79g46mQ4zIkLiNX4FpdsBo_6nh52fs',
              language: 'en',
            }}
          />

          <View style={{height: 20}}/>
          <TouchableOpacity onPress={this._submitPhoto} style={styles.postButton}>
            <Text style={styles.infoCardText}>Report This Incident</Text>
          </TouchableOpacity> 
        </View>
      </LinearGradient>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
      
      const { status2 } = await Permissions.askAsync(Permissions.CAMERA);
      if (status2 !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: false,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
    } catch (E) {
      console.log(E);
    }
  };

  _takePhoto = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 1,
        base64: false,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
    } catch (E) {
      console.log(E);
    }
  };

  _submitPhoto = () => {
    this.props.navigation.navigate('Analyze', {image: this.state.image})
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
  container:{
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  headerBack:{ 
    height: 60,
  },
  imageContainer: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 20,
    marginHorizontal: 63,
    margin: 5,
  },
  emptyPhoto: {
    width: 100,
    height: 100,
    borderRadius: 5,
    flex: 0.7
  },
  pictureTaking:{
    alignSelf: 'center',
    width: 390,
    height: 200,
    borderRadius: 10,
    marginHorizontal: 2,
    marginBottom: 2,
  },
  headerText:{
    color: 'black',
    fontSize: 20,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
    backgroundColor: 'lightblue',
  },
  infoCard: {
    backgroundColor: 'lightblue',
    margin: 5,
    padding: 12,
    borderRadius: 5,
    elevation: 2,
    width: '100%'
  },
  postButton: {
    backgroundColor: 'lightgreen',
    margin: 30,
    marginBottom: 30,
    padding: 12,
    borderRadius: 5,
    elevation: 2,
  },
  infoCardText: {
    textAlign: 'center',
    fontSize: 18,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(PostScreen);