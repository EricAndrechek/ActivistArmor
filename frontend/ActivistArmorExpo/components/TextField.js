import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield';
 
export default class CustomText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      field: null
    }
  }

  fieldRef = React.createRef();
 
  onSubmit = () => {
    let { current: field } = this.fieldRef;
 
    console.log(field.value());
  };
 
 
  render() {
    return (
      <View style={styles.box}>
        <TextField
          label={this.props.label}
          keyboardType='default'
          onSubmitEditing={this.onSubmit}
          value={this.state.field}
          onChangeText={field => this.setState({field})}
          ref={this.fieldRef}
          baseColor={'#fafafa'}
          multiline={this.props.multiline}
          textColor={'#fafafa'}
        />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    marginVertical: 0,
    padding: 0,
    marginHorizontal: 28,
  }
})
