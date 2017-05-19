import React from 'react';
import {
  View,
  Text
} from 'react-native';
import {
  FormLabel,
  FormInput,
  SearchBar,
  Button
} from 'react-native-elements';
import { connect } from 'react-redux';

import { createContact } from '../../actions';

class AddContact extends React.Component {
  static navigationOptions = {
    title: 'New Contact'
  }

  state = { 
    email: '', 
    name: '',
    error: ''
  };

  handleSubmit = () => {
    const { email, name } = this.state;
    this.props.createContact(email, name);
  }

  render() {
    return (
      <View>
          <FormLabel>Email</FormLabel>
          <FormInput
            autoCorrect={false}
            autoCapitalize='none'
            keyboardType='email-address'
            value={this.state.email}
            onChangeText={email => this.setState({ email: email.trim() })}
            placeholder='email@example.com'
          />

          <FormLabel>Name</FormLabel>
          <FormInput
            autoCorrect={false}
            autoCapitalize='none'
            value={this.state.name}
            onChangeText={name => this.setState({ name })}
            placeholder='e.g. Laurence'
          />

          <Button
            title='SUBMIT'
            onPress={this.handleSubmit}
          />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  contacts: state.contacts
})

export default connect(mapStateToProps,{createContact} )(AddContact);