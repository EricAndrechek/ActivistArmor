import React, { Component } from 'react';
import {View, Text, ImageBackground, StyleSheet, TouchableOpacity, Image} from 'react-native'

import Ionicon from "react-native-vector-icons/Ionicons";


import {connect} from 'react-redux';

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