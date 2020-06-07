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

import {NavBar, Input, theme} from 'galio-framework'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { Icon } from "react-native-elements";
import {LinearGradient} from 'expo-linear-gradient'

export default class CustomBottomTab extends React.Component{
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
      <View style={styles.bottomTab}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => (this.props.nav.navigate('Feed'))} style={styles.feedBox}>
            <Icon name={"ios-home"} size={40} color={"black"} type='ionicon'/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => (this.props.nav.navigate('Map'))} style={styles.mapBox}>
            <Icon name={'map'} size={40} color={"black"} type='material'/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => (this.props.nav.navigate('Post'))} style={styles.postBox}>
            <Icon name={'camera'} size={40} color={"black"} type='material'/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
function PostButton(props){
  return(
    <TouchableOpacity style={styles.rightButton} onPress={() => (props.navigation.navigate('Post'))}>
      <MaterialCommunityIcons name={"image-plus"} size={30} color={'white'}/>
    </TouchableOpacity>
  )
}

function LeftMenu(props){
  return(
    <TouchableOpacity>
      <MaterialCommunityIcons name={"menu-open"} size={30} color={'white'}/>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText:{
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: 25,
  },
  leftButton: {
    flex: 0.3,
    margin: 0,
  },
  search: {
    width: 380,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#cccccc',
    marginBottom: 5,
  },
  bottomTab: {
    height: 60,
    borderBottomWidth: 0,
  },
  rowBar: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feedBox: {
    flex: 1,
  },
  mapBox: {
    flex: 1,
  },
  postBox: {
    flex: 1,
  },
})