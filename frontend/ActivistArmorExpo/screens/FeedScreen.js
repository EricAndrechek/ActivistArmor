import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList, ScrollView} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {LinearGradient} from 'expo-linear-gradient';

import CustomHeader from '../components/Header'
import CustomBottomTab from '../components/BottomTab'

const data = [
  {
    address: "Buffalo, New York",
    image: require('../assets/images/buffaloriotattack.jpg'),
    id: 1,
  },
  {
    address: "London, UK",
    image: require('../assets/images/londonattack.jpg'),
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
        <ScrollView
          data={data}
          keyExtractor={item => item.id}
          style={styles.listContainer}
        >
          {data.map((item, key) => ( 
            <Post postData={item} key={key}/>
          ))}
        </ScrollView>
        <CustomBottomTab nav={this.props.navigation}/>
      </LinearGradient>
    );
  }
}

function Post(input){
  return(
    <View style={styles.post}>
      <View style={styles.row}>
        <Text style={styles.postLocation}>{input.postData.address}</Text>
        <TouchableOpacity style={{paddingRight: 5}}>
          <MaterialCommunityIcons name={'dots-horizontal'} size={30}/>
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
    borderRadius: 10,
    borderColor: '#e0e0e0',
    flex: 1,
    elevation: 5,
    paddingTop: 10,
    marginBottom: 10,
    marginHorizontal: 12,
    overflow: 'hidden',
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

/*
GET request to https://activistarmor.online/api/feed
Expected Response: 
{
  {
  'url': "https://activist-armor.nyc3.cdn.digitalocean.com/asdhka.mp4",
  'timestamp': '14:34:15 UTC 06/06/2020',
  'longitude': "34.324 N",
  'latitude': "87.3242 W"
  },
  {
  (the same sort of body will repeat with different data and give you exactly 10 of the most recent posts in that format)
  }
}
*/