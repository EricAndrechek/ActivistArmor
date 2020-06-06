import * as React from 'react';
import { 
  Image, 
  Platform, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from 'react-native';

import {  Header} from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import GestureRecognizer from 'react-native-swipe-gestures';

import {connect} from 'react-redux';

class HomeScreen extends React.Component{
  render(){
    return (
      <GestureRecognizer 
      style={styles.container}
      onSwipeLeft={this._onSwipeLeft}>
        <Header 
            backgroundColor='#fafafa'
            centerComponent={{ text: "Feed", style: styles.headerText}}
          ></Header>
        <View style={styles.container}>
          <Text>Empty</Text>
        </View>
      </GestureRecognizer>
    );
  }

  _onSwipeLeft = gestureState =>{
    this.props.navigation.navigate('Links')
  }  
}

HomeScreen.navigationOptions = {
  header: null,
};

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
  contentContainer: {
    paddingTop: 30,
  },
  headerText:{
    color: 'black',
    fontSize: 20,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);