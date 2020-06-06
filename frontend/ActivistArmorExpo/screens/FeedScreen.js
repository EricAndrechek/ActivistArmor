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

import {Header} from 'react-native-elements'
import {ScrollView} from 'react-native-gesture-handler';
import GestureRecognizer from 'react-native-swipe-gestures';

import {connect} from 'react-redux';

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
        <Header 
            backgroundColor='#fafafa'
            centerComponent={{ text: "Feed", style: styles.headerText}}
            containerStyle={{
              height: 60,
            }}
        />

      <FlatList
        data={data}
        renderItem={({ item }) => <Post postData={item} />}
        keyExtractor={item => item.id}
      />
        
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
      <Text style={styles.postLocation}>{input.postData.location}</Text>
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
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  headerText:{
    color: 'black',
    fontSize: 20,
  },
  post: {
    borderWidth: 0,
    flex: 1,
    elevation: 2,
    paddingVertical: 30,
  },
  postLocation: {
    padding: 5,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  postImage: {
    width: '100%',
    height: 300,
  },
  postCommentBox: {
  },
  comment: {
    padding: 5,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  infoBox: {
    padding: 5,
    paddingHorizontal: 10,
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen);