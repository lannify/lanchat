import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase';

import firebaseConfig from '../../config/firebase';
import { BRAND_BLUE, SCREEN_HEIGHT } from '../../styles';

class Splash extends React.Component {

  static navigationOptions = {
    header: null
  }

  componentWillMount() {
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
          this.props.navigation.navigate('main');
      } else {
          this.props.navigation.navigate('unauthorized');
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.bgImage} source={require('../../images/splash.png')}>
          <Text style={styles.headingStyle}>LanChat</Text>
        </Image>     
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: BRAND_BLUE,
    height: SCREEN_HEIGHT,
   
  },
  headingStyle: {
    fontSize: 52,
    color: '#fff'
  },
  bgImage: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
});

export default Splash;