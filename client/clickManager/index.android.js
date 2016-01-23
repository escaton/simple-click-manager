/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

var server = 'http://87.228.25.74';

class clickManager extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      buttons: [
        {
          text: 'Button 1'
        },
        {
          text: 'Button 2'
        },
        {
          text: 'Button 3'
        }
      ]
    }
  }
  _onPressButton(e) {
    var id = this.index;
    fetch(server + '/?button=' + id);
  }
  render() {
    let buttons = this.state.buttons.map((button, index) => {
      return (
        <TouchableOpacity key={index} index={index} onPress={this._onPressButton} activeOpacity={0.7}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>{button.text}</Text>
          </View>
        </TouchableOpacity>
      )
    })
    return (
      <View style={styles.container}>
        {buttons}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    margin: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: '#2E6DA4',
    backgroundColor: '#337AB7'
  },
  buttonText: {
    color: '#fff',
    fontSize: 25
  }
});

AppRegistry.registerComponent('clickManager', () => clickManager);
