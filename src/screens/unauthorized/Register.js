import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {
  Card,
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage,
  Icon
} from 'react-native-elements';
import firebase from 'firebase';
import { connect } from 'react-redux';

import { createUser } from '../../actions';
import { BRAND_BLUE, SCREEN_HEIGHT } from '../../styles';
import Spinner from '../../components/Spinner';

class Register extends React.Component {

  state = {
    error: '',
    emailError: '',
    passwordError: '',
    email: '',
    password: '',
    displayName: '',
    loading: false
  }

  validEmail(email) {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  }

  validPassword(password) {
    return password.length >= 6;
  }

  validDisplayName(name) {
    return name.length >= 2;
  }

  buttonIsEnable() {
    return this.validEmail(this.state.email) 
           && this.validPassword(this.state.password) 
           && this.validDisplayName(this.state.displayName);
  }

  goToLogIn = () => {
    this.props.navigation.navigate('logIn');
  }

  handleSubmit = () => {
    this.setState({ loading: true });
    const { email, password, displayName } = this.state;
    this.props.createUser(email, password, displayName);
  }

  renderSpinner() {
    if (this.state.loading) {
      return <Spinner />;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.heading}>
            <Icon name="create" size={65} iconStyle={styles.icon} color={BRAND_BLUE} />
            <Text style={styles.headingText}>Register</Text>
          </View>

          <Text style={styles.error}>{this.state.error}</Text>

          {this.renderSpinner()}

          <FormLabel>Email</FormLabel>
          <FormInput
            autoCorrect={false}
            autoCapitalize='none'
            keyboardType='email-address'
            value={this.state.email}
            onChangeText={email => this.setState({ email: email.trim() })}
            placeholder='email@example.com'
          />
          <FormValidationMessage>{this.state.emailError}</FormValidationMessage>

          <FormLabel>Password</FormLabel>
          <FormInput
            autoCorrect={false}
            autoCapitalize='none'
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={ password => this.setState({ password })}
            placeholder='************'
            inputStyle={styles.formInput}
          />

          <FormLabel>Display Name</FormLabel>
          <FormInput
            autoCorrect={false}
            autoCapitalize='none'
            value={this.state.displayName}
            onChangeText={ displayName => this.setState({ displayName })}
            placeholder='e.g. Lauren'
            inputStyle={styles.formInput}
          />

          <Button
            title='SUBMIT'
            buttonStyle={styles.button}
            disabledStyle={{ backgroundColor: '#BBDEFB' }}
            onPress={this.handleSubmit}
            disabled={!this.buttonIsEnable()}
          />

          <Button
            title='Have an account? Login here'
            onPress={this.goToLogIn}
            backgroundColor={'rgba(0,0,0,0)'}
            textStyle={styles.linkStyle}
          />
        </View>     
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BRAND_BLUE,
    justifyContent: 'center',
    padding: 5
  },
  textStyle:{
    color: '#fff'
  },
  button: {
    backgroundColor: BRAND_BLUE,
    marginTop: 25
  },
  heading: {
    marginBottom: 20
  },
  headingText: {
    textAlign: 'center',
    fontSize: 25,
    color: BRAND_BLUE,
  },
  form: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20
  },
  card: {
    paddingBottom: 60,
    paddingTop: 60,
    borderRadius: 3
  },
  header: {
    padding: 15,
    paddingTop: 20,
    backgroundColor: '#26272b'
  },
  headerText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff'
  },
  icon: {
    marginBottom: 20
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20
  },
  spinnerWrapper: {
    justifyContent: 'center',
    paddingTop: 200
  },
  linkStyle: {
    color: BRAND_BLUE
  }
});

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {createUser})(Register);
