import * as React from 'react';
import { 
  Image, 
  StyleSheet, 
  Text, 
  View,
  FlatList,
  ScrollView,
  ImageBackground,
} from 'react-native';

import {Header} from 'react-native-elements'


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
      <View>
        <Header 
            backgroundColor='#fafafa'
            centerComponent={{ text: "Feed", style: styles.headerText}}
            containerStyle={{
              height: 60,
            }}
        />
        <Text style={styles.incidents}>Close By</Text>
        <FlatList
          data={data}
          renderItem={({ item }) => <CarouselPost postData={item} />}
          keyExtractor={item => item.id}
          horizontal= {true}
          decelerationRate={0}
          snapToInterval={200} //your element width
          snapToAlignment={"center"}
          style={{marginVertical: 10, paddingVertical: 10}}
          contentContainerStyle={{borderRadius: 10, overflow: 'hidden'}}
        />

        <FlatList
          data={data}
          renderItem={({ item }) => <Post postData={item} />}
          keyExtractor={item => item.id}
        />
          
      </View>
    );
  }
}

FeedScreen.navigationOptions = {
  header: null,
};


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

function CarouselPost(input){
  return(
    <View style={styles.CarouselPost}>
      <Image source={input.postData.image} style={styles.CarouselPostImage}/>
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
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 30,
  },
  headerText:{
    color: 'black',
    fontSize: 20,
    paddingBottom: 30,
  },
  post: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    borderWidth: 0,
    flex: 1,
    paddingVertical: 30,
  },
  postLocation: {
    padding: 5,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  postImage: {
    
    borderRadius: 5,
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
  },
  CarouselPost: {
    borderRadius: 10,
    height: 210,
    width: 130,
    margin: 8,
    paddingBottom: 5,
    marginBottom: 10,
    overflow: 'hidden',
  },
  CarouselPostImage: {
    borderRadius: 10,
    height: 210,
    width: 130,
    resizeMode: 'cover',
    overflow: 'hidden',
  },
  incidents: {
    marginTop: 10,
    marginHorizontal: 20,
    fontSize: 25,
    fontWeight: 'bold',
  }
});

export default FeedScreen;