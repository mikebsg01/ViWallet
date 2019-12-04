import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainNavigator from './navigation/MainNavigator';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MainNavigator/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});