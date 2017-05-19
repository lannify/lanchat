import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class ChatRoom extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'ChatRoom',
    headerLeft: null,
    tabBarIcon: <Ionicons name='ios-cog' size={26} color='#fff' />
  });


  componentDidMount() {
    // fetch Chatroom with ContactUid from navigation.state.params
    console.log(this.props.navigation)
  }

  render() {
    return (
      <View>
        <Text>This is ChatRoom screen</Text>
      </View>
    );
  }
}

export default ChatRoom;