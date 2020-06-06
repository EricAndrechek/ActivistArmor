import React, { Component } from 'react'
import {StyleSheet, ImageBackground, Text, TouchableOpacity} from 'react-native';

import Icon from "react-native-vector-icons/Ionicons"

export default class PreviewScreen extends Component {
  render(){
    const { navigation } = this.props;
    const image = navigation.getParam("imageData", {})
    return(
      <ImageBackground source={{uri: image.uri}}
        style={styles.container}
        resizeMode='contain'>
          
        <View style={styles.bar}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("Camera")}
            style={styles.backButton}
            >
            <Icon name='md-close' size={50} color='black'/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("Upload")} style={styles.continueBox}>
            <Text style={styles.continueText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    )
  }
}


const styles = StyleSheet.create({
  container: {
     flex: 1,
     backgroundColor: 'whitesmoke',
     padding: 45,
  },
  title: {
     paddingLeft: 10,
     color: "silver",
     fontSize: 25,
     fontFamily: 'Avenir-Black',
     fontWeight: "100",
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
     flexDirection: "row",
     alignItems: "center"
  },
  continueBox: {
    
    flexDirection: "row",
    alignItems: "center"
  },
  continueText: {
    color: 'white',
    fontSize: 15,
  }

})