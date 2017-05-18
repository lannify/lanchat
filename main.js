import Expo from 'expo';
import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store';
import AppNavigator from './src/navigation/AppNavigator';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <StatusBar barStyle='light-content' />
          <AppNavigator />
        </View>
      </Provider>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

Expo.registerRootComponent(App);
