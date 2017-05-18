import React from 'react';
import {
  Text,
  View,
  ListView,
  ScrollView,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

import FeedItem from './FeedItem';

const CHAT_DATA = [
    { firstName: 'Jack', lastName: 'London', lastLine: 'Whats up' },
    { firstName: 'ge', lastName: 'hu', lastLine: 'Hey hows it going?' },
    { firstName: 'Robert', lastName: 'Paulson', lastLine: 'What about react native' },
    { firstName: 'Marla', lastName: 'Kostanki', lastLine: 'Brunch at Three Doors Down' },
    { firstName: 'Norman', lastName: 'Rockwell', lastLine: 'That thing you mentioned yesterday...' },
    { firstName: 'Max', lastName: 'Rockatansky', lastLine: 'My name is Max' },
    { firstName: 'Spike', lastName: 'Spiegel', lastLine: 'Hnnn' },
    { firstName: 'Faye', lastName: 'Valentine', lastLine: 'This is my funny Valentine' }
];

class Feed extends React.Component {

    static navigationOptions = ({ navigation }) => ({
      title: 'Chats',
      tabBarIcon: <Ionicons name='ios-chatbubbles' size={26} color='#fff' />
    });

  renderChats() {
    return CHAT_DATA.map(chat =>
      <FeedItem key={chat.firstName} chat={chat} />
    );
  }

  render() {
    return (
      <View>
        {this.renderChats()}
      </View>
    );
  }
}



export default Feed;