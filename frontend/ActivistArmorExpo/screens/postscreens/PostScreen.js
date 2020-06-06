
import * as React from 'react';
import {ImageBackground, Text, TouchableOpacity, Image, View, StyleSheet } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {connect} from 'react-redux';
//import { TouchableOpacity } from 'react-native-gesture-handler';

import CustomHeader from '../../components/Header'
import CustomText from '../../components/TextField'

class PostScreen extends React.Component {
  state = {
    image: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={styles.container}>
        <CustomHeader nav={this.props.navigation} title={"Post"}/>
        <View style={{ flex: 1}}>
          <View>
            {
              image ?
              <View>
                <View style={styles.imageContainer}>
                  <Image source={{ uri: image }} style={styles.emptyPhoto} />
                </View>  
              </View>
              : 
              <View style={styles.imageContainer}>
                  <Image source={
                    require('../../assets/images/nophoto.jpg')
                  } style={styles.emptyPhoto} />
                
              </View>
            }  
          </View>
          
          <CustomText label={"Location"}/>
          <CustomText label={"Caption"}/>

          <View style={{height: 20}}/>

          <TouchableOpacity onPress={this._pickImage} style={styles.infoCard}>
            <Text style={styles.infoCardText}>Choose Image</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._takePhoto} style={styles.infoCard}>
            <Text style={styles.infoCardText}>Take photo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._submitPhoto} style={styles.postButton}>
            <Text style={styles.infoCardText}> Post </Text>
          </TouchableOpacity> 
        </View>
      </View>
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
    alignSelf: 'center',
    width: 250,
    height: 200,
    borderRadius: 20,
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
    backgroundColor: 'white',
    marginHorizontal: 5,
    margin: 5,
    padding: 12,
    borderRadius: 5,
    elevation: 2,
  },
  postButton: {
    backgroundColor: 'white',
    marginHorizontal: 120,
    margin: 5,
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