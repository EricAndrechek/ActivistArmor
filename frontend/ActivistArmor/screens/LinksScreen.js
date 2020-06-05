import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

import GestureRecognizer from 'react-native-swipe-gestures';

import {connect} from 'react-redux';

class LinksScreen extends React.Component {
  render(){
    return (
      <GestureRecognizer style={styles.container} onSwipeRight={this._onSwipeRight}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          
          <TouchableOpacity onPress={() => this.props.increaseCounter()}>
            <Text style={styles.getStartedText}>
              CountUp
            </Text>
          </TouchableOpacity>

          
          <Text style={styles.getStartedText}>{this.props.counter}</Text>
          
          <OptionButton
            icon="md-school"
            label="Read the Expo documentation"
          />

          <OptionButton
            icon="md-compass"
            label="Read the React Navigation documentation"
            
          />

          <OptionButton
            icon="ios-chatboxes"
            label="Ask a question on the forums"
          
            isLastOption
          />
        </ScrollView>
      </GestureRecognizer>
    );
  }
  
  _onSwipeRight = gestureState =>{
    this.props.navigation.navigate('Home')
  }  
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
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
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(LinksScreen);