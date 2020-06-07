import React from 'react';
import {View, Text, ImageBackground, StyleSheet, TouchableOpacity} from 'react-native'
import Ionicon from "react-native-vector-icons/Ionicons";

export default function ViewScreen ({route, navigation}) {
  const imageUrl = route.params.imageUrl
  console.log("new")
  console.log(imageUrl)
  //console.log(JSON.stringify(imageUrl))
  return(
    <ImageBackground source={{uri: imageUrl}} style={styles.container} resizeMode={'contain'}>
      <TouchableOpacity
      onPress={()=>{
          navigation.navigate('Map')
      }}
      style={styles.backButtonBox}>
      <Ionicon name="md-close" size={30} style={styles.backButton}/>
    </TouchableOpacity>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  backButton: {
    margin: 10,
    color: 'white',
  },
  backButtonBox: {
    color: 'white',
    marginTop: 20,
    paddingLeft: 10,
  }
})