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
import {MaterialIcons} from '@expo/vector-icons'

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
      <View style={styles.header}>
        <NavBar
          title={this.props.title}
          titleStyle={styles.headerText}
          right={this.renderRight(this.props)}
          left={<LeftMenu navigation={this.props.nav}/>}
          leftStyle={styles.leftButton}
          style={{margin: 0}}
        />
        <Input
          right
          color="black"
          style={styles.search}
          placeholder="What are you looking for?"
          onFocus={() => navigation.navigate('Pro')}
          iconContent={<MaterialIcons size={16} color={theme.COLORS.MUTED} name="search" family="entypo" />}
        />
      </View>
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
  container: {
    flex: 1,
  },
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
  },
  search: {
    width: 380,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#cccccc',
    marginBottom: 5,
  },
  header: {
    backgroundColor: '#fff',
    elevation: 20,
    borderBottomWidth: 0,
    marginBottom: 10,
  },
})