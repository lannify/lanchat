import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class Settings extends React.Component {
   static navigationOptions = ({ navigation }) => ({
      title: 'Settings',
      headerLeft: null,
      tabBarIcon: <Ionicons name='ios-cog' size={26} color='#fff' />
   });

  render() {
    return (
      <View>
        <Text>This is Settings screen</Text>
      </View>
    );
  }
}

export default Settings;