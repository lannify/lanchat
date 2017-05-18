import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class List extends React.Component {
   static navigationOptions = ({ navigation }) => ({
      title: 'Contacts',
      headerLeft: null,  
      tabBarIcon: <Ionicons name='ios-contacts' size={26} color='#fff' />
   });

  render() {
    return (
      <View>
        <Text>This is List screen</Text>
      </View>
    );
  }
}

export default List;