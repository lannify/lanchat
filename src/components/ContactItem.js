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

const ContactItem = ({ contact }) => {
  const { name, uid } = contact;

  return (
    <ListItem
      key={uid}
      roundAvatar
      title={
        <View>
          <Text style={styles.nameText}>{name}</Text>
        </View>
      }
      avatar={contact.avatarUrl ? contact.avatarUrl : require('../images/default-avatar.png')}
      avatarStyle={styles.avatarStyle}
      containerStyle={styles.listItem}
    />
  );
};

const styles = StyleSheet.create({
  nameText: {
    marginBottom: 5
  },
  contactText: {
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

export default ContactItem;