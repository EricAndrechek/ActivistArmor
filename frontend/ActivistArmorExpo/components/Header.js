import * as React from 'react';
import { 
  Image, 
  Platform, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View,
  FlatList
} from 'react-native';

import {NavBar} from 'galio-framework'
import {MaterialCommunityIcons} from '@expo/vector-icons'

export default class CustomHeader extends React.Component{
  renderRight = () => {
    switch(this.props.title){
      case 'Feed':
        return(
          <PostButton navigation={this.props.nav}/>
        );
      case 'Map':
        return(
          <PostButton navigation={this.props.nav}/>
        );
    }
  }
  render(){
    return(
      <NavBar
        title={this.props.title}
        titleStyle={styles.headerText}
        right={this.renderRight(this.props)}
        left={<LeftMenu navigation={this.props.nav}/>}
        leftStyle={styles.leftButton}
      />
    )
  }
}
function PostButton(props){
  return(
    <TouchableOpacity style={styles.rightButton} onPress={() => (props.navigation.navigate('Post'))}>
      <MaterialCommunityIcons name={"image-plus"} size={30}/>
    </TouchableOpacity>
  )
}

function LeftMenu(props){
  return(
    <TouchableOpacity onPress={() => (props.navigation.navigate('Post'))}>
      <MaterialCommunityIcons name={"menu-open"} size={30}/>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  headerText:{
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: 25,
  },
  leftButton: {
    flex: 0.3,
    margin: 0,
  }
})