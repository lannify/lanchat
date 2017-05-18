import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import {
  Avatar,
  Card,
  ListItem
} from 'react-native-elements';

const FeedItem = ({ chat }) => {
  const { firstName, lastName, lastLine } = chat;
  const fullName = firstName.charAt(0).toUpperCase() + firstName.slice(1) + ' ' + lastName.charAt(0).toUpperCase() + lastName.slice(1);

  return (
    <ListItem
      key={fullName}
      roundAvatar
      title={
        <View>
          <Text style={styles.nameText}>{fullName}</Text>
        </View>
      }
      subtitle={
        <View>
          <Text style={styles.chatText}>{lastLine}</Text>
        </View>
      }
      avatar={chat.avatarUrl ? chat.avatarUrl : require('../../images/default-avatar.png')}
      avatarStyle={styles.avatarStyle}
      containerStyle={styles.listItem}
    />
  );
};

const styles = StyleSheet.create({
  nameText: {
    marginBottom: 5
  },
  chatText: {
    color: '#464646'
  },
  avatarStyle: {
    marginRight: 20
  },
  avatarText: {
    fontSize: 15
  },
  listItem: {
    padding: 5
  }
});

export default FeedItem;