import React from 'react';
import { Text, View } from 'react-native';
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

import { logInUser } from '../../actions';
import { BRAND_BLUE, SCREEN_HEIGHT } from '../../styles';
import Spinner from '../../components/Spinner';

class LogIn extends React.Component {

  state = {
    email: '',
    password: '',
    error: '',
    emailError: '',
    passwordError: '',
    showForm: false,
    loading: false
  };

  componentWillMount(){
    this.setState({ showForm: true });
  }

  componentWillUnmount() {
    this.setState({
      email: '',
      password: '',
      error: '',
      emailError: '',
      passwordError: '',
      showForm: false
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.error !== '') {
      this.setState({ error: nextProps.auth.error });
      this.setState({ loading: false });
    }
  }

  validEmail(email) {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  }

  validPassword(password) {
    return password.length >= 6;
  }

  buttonIsEnable() {
    return this.validEmail(this.state.email) && this.validPassword(this.state.password);
  }

  handleSubmit = () => {
    this.setState({ loading: true });
    const { email, password } = this.state;
    this.props.logInUser(email, password);
  }

  goToRegister = () => {
    this.props.navigation.navigate('register');
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
            <Icon name="lock-outline" size={65} iconStyle={styles.icon} color={BRAND_BLUE} />
            <Text style={styles.headingText}>Log In</Text>
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

          <Button
            title='SUBMIT'
            buttonStyle={styles.button}
            disabledStyle={{ backgroundColor: '#BBDEFB' }}
            onPress={this.handleSubmit}
            disabled={!this.buttonIsEnable()}
          />

          <Button
            title='Create New Account'
            onPress={this.goToRegister}
            backgroundColor={'rgba(0,0,0,0)'}
            textStyle={styles.linkStyle}
          />
        </View>     
      </View>
    );
  }
}

const styles = {
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
    marginTop: 35
  },
  heading: {
    marginBottom: 10
  },
  headingText: {
    textAlign: 'center',
    fontSize: 25,
    color: BRAND_BLUE,
  },
  form: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 10,
    paddingTop: 60,
    paddingBottom: 60
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
};


const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {logInUser})(LogIn);