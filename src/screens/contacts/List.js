import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import { fetchContacts } from '../../actions';
import ContactItem from '../../components/ContactItem';

class List extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Contacts',
    headerLeft: null,  
    tabBarIcon: <Ionicons name='ios-contacts' size={26} color='#fff' />,
    headerRight: <Ionicons 
                    name='ios-add' 
                    size={32} 
                    color='#fff'
                    style={{ marginRight: 15 }} 
                    onPress={() => navigation.navigate('addContact')}
                  />
  });


  state = { contacts: [] };

  componentDidMount = async () => {
    await this.props.fetchContacts();

    if (this.props.contacts) {
      this.setState({ contacts: this.props.contacts });
    }
  }

  renderContacts() {
    if (this.state.contacts.length > 0) {
      return this.state.contacts.map(contact =>
        <ContactItem key={contact.uid} contact={contact} />
      );
    }
  }

  render() {
    return (
      <View>
        {this.renderContacts()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  contacts: state.contacts.contactList
})

export default connect(mapStateToProps, {fetchContacts})(List);