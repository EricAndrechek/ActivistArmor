import * as React from 'react';
import { 
  Image, 
  Platform, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View,
  FlatList,
} from 'react-native';


import {ScrollView} from 'react-native-gesture-handler';
import GestureRecognizer from 'react-native-swipe-gestures';

import {MaterialCommunityIcons} from '@expo/vector-icons'

import {LinearGradient} from 'expo-linear-gradient';

import {connect} from 'react-redux';

import CustomHeader from '../components/Header'
import CustomBottomTab from '../components/BottomTab'

const data = [
  {
    location: "Buffalo, New York",
    image: require('../assets/images/buffaloriotattack.jpg'),
    caption: "Buffalo Riot Attack",
    comments: ["wait what", "so uncool"],
    id: 1,
  },
  {
    location: "Alternate Buffalo, New York",
    image: require('../assets/images/buffaloriotattack.jpg'),
    caption: "Alternate Buffalo Riot Attack",
    comments: ["wait what", "so uncool", "huh"],
    id: 2,
  }
]

class FeedScreen extends React.Component{
  render(){
    return (
      <GestureRecognizer 
      style={styles.container}
      onSwipeLeft={this._onSwipeLeft}>
        
        <LinearGradient colors={['#2193b0', '#6dd5ed']} 
          style={styles.container}>
          <CustomHeader nav={this.props.navigation} title={"Feed"}/>
        
          <FlatList
            data={data}
            renderItem={({ item }) => <Post postData={item} />}
            keyExtractor={item => item.id}
            style={styles.listContainer}
          />
        </LinearGradient>
      </GestureRecognizer>
    );
  }

  _onSwipeLeft = gestureState =>{
    this.props.navigation.navigate('Map')
  }  
}

FeedScreen.navigationOptions = {
  header: null,
};

function Test(){
  return(
    <Text>testingone</Text>
  )
}

function Post(input){
  return(
    <View style={styles.post}>
      <View style={styles.row}>
        <Text style={styles.postLocation}>{input.postData.location}</Text>
        <TouchableOpacity style={{paddingTop: 0}}>
          <MaterialCommunityIcons name={'dots-horizontal'} size={20}/>
        </TouchableOpacity>
      </View>
      <Image source={input.postData.image} style={styles.postImage}/>
      <Text style={styles.infoBox}>
        Buffalo Riot Attack
      </Text>
      <View style={styles.postCommentbox}>
        <Text style={styles.comment}>Comments</Text>
      </View>
    </View>
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
  },
  listContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  post: {
    backgroundColor: 'white',
    borderWidth: 0,
    borderRadius: 5,
    borderColor: '#e0e0e0',
    flex: 1,
    elevation: 5,
    paddingBottom: 10,
    marginBottom: 10,
    marginHorizontal: 12,
  },
  postLocation: {
    paddingBottom: 5,
    paddingHorizontal: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  postImage: {
    width: '100%',
    height: 200,
  },
  postCommentBox: {
  },
  comment: {
    color: '#9e9e9e',
    padding: 5,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  infoBox: {
    paddingTop: 5,
    paddingHorizontal: 8,
    fontWeight: 'bold',
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen);