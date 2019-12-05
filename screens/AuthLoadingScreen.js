import React, { Component } from 'react';

import {
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  View,
  Image,
} from 'react-native';

export default class AuthLoadingScreen extends Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    setTimeout(async () => {
        const userToken = await AsyncStorage.getItem('session');
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    }, 3000);
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
            style={styles.imgLogo}
            source={require('./../assets/img/logo-viwallet-1.png')}
        />
        <ActivityIndicator color="#20124d" size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        backgroundColor: '#fff'
    },
    imgLogo: {
        width: 120,
        resizeMode: 'contain'
    }
});