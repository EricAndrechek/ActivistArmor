import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {LinearGradient} from 'expo-linear-gradient';

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
    location: "London, UK",
    image: require('../assets/images/londonattack.jpg'),
    caption: "London attack",
    comments: ["wait what", "so uncool", "huh"],
    id: 2,
  }
]

export default class FeedScreen extends React.Component{

  state = {
    data: []
  }

  componentDidMount(){
    // this.receiveData()
  }
  
  receiveData = () => {
    fetch('https://activistarmor.online/api/feed', {
      method: 'GET'
    }).then(res => res.json()).then(res => {
      this.setState({ data: res })
    })
  }

  render(){
    return (
      <LinearGradient colors={['#2193b0', '#6dd5ed']} 
        style={styles.container}>
        <CustomHeader nav={this.props.navigation} title={"Feed"}/>
      
        <FlatList
          data={data}
          renderItem={({ item }) => <Post postData={item} />}
          keyExtractor={item => item.id}
          style={styles.listContainer}
        />
        <CustomBottomTab nav={this.props.navigation}/>
      </LinearGradient>
    );
  }
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
    </View>
  )
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