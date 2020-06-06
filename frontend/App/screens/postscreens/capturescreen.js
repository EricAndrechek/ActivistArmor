import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { RNCamera } from 'react-native-camera';

import Ionicon from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";


const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text>Waiting</Text>
  </View>
);

export default class CaptureScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraType: RNCamera.Constants.Type.back,
      flashMode: RNCamera.Constants.FlashMode.on,
    };
  }
  launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri
        });

        this.props.navigation.navigate('Preview', {imageData: response})
      }
    });
  }
  handleCameraType=()=>{
    const { cameraType } = this.state
    this.setState({cameraType:
      cameraType === RNCamera.Constants.Type.back
      ? RNCamera.Constants.Type.front
      : RNCamera.Constants.Type.back
    })
  }
  handleFlashMode=()=>{
    const { flashMode } = this.state
    this.setState({flashMode:
      flashMode === RNCamera.Constants.FlashMode.on
      ? RNCamera.Constants.FlashMode.off
      : RNCamera.Constants.FlashMode.on
    })
  }

  render() {
    return (
      <View style={styles.container}>
       <RNCamera
          style={styles.preview}
          captureAudio={false}
          type={this.state.cameraType}
          flashMode={this.state.flashMode}
        >
          {({ camera, status }) => {
            if (status !== 'READY') return <PendingView />;
            return (
              <View style={styles.container}>
                <View style={styles.bar}>
                  <TouchableOpacity
                    onPress={this.handleFlashMode}
                      style={styles.flashBox}>
                      {(this.state.flashMode == RNCamera.Constants.FlashMode.on) ? <Ionicon name="ios-flash" size={50} style={styles.flash}/> : <Ionicon name="ios-flash-off" size={50} style={styles.flash}/>}
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={()=>{
                        this.props.navigation.navigate('Upload')
                    }}
                    style={styles.backButtonBox}>
                    <Ionicon name="md-close" size={30} style={styles.backButton}/>
                  </TouchableOpacity>
                <View style={styles.bottom}>
                  <View style={styles.bottomBar}>
                    <TouchableOpacity style={styles.imageGalleryBox}>
                      <Icon name="image" size={50} style={styles.imageGallery} onPress={this.launchImageLibrary}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.takePictureBox}>
                      <Icon name="circle-thin" size={70} style={styles.takePicture}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={this.handleCameraType}
                      style={styles.reverseCameraBox}>
                      <Ionicon name="ios-reverse-camera" size={50} style={styles.reverseCamera}/>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        </RNCamera>
     </View>
    )
  }
  takePicture = async function (camera) {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    console.log(data.uri);
    
    this.props.navigation.navigate('Preview', {imageData: data});
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottom: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  bottomBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  preview: {
    flex: 1,
  },
  instruction: {
    fontSize: 20,
  },
  imageGallery: {
    color: 'white',
  },
  takePicture: {
    color: 'white',
  },
  backButtonBox: {
    margin: 10,
  },
  imageGalleryBox: {
    alignSelf: 'center',
    marginHorizontal: 20,
    margin: 10,
  },
  takePictureBox: {
    alignSelf: 'center',
    marginHorizontal: 20,
    margin: 10,
  },
  backButton: {
    color: 'white',
    paddingLeft: 10,
  },
  reverseCamera: {
    color: 'white',
  },
  reverseCameraBox: {
    margin: 20,
  },
  flash: {
    color: 'white',
  },
  flashBox: {
    margin: 20,
  }
})