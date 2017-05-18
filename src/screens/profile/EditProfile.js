import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import {
  FormInput,
  FormLabel,
  Button
} from 'react-native-elements';
import { connect } from 'react-redux';
import firebase from 'firebase';

import { updateUser } from '../../actions';
import { BRAND_BLUE } from '../../styles';
import Spinner from '../../components/Spinner';

class EditProfile extends React.Component {

   static navigationOptions = ({ navigation }) => ({
      title: 'Edit Profile'
   });

   state = {
     email: '',
     displayName: '',
     loading: false
   }

   componentDidMount() {
     const { email, displayName } = firebase.auth().currentUser;
     this.setState({ email, displayName });
   }

   onUpdateComplete() {
     this.setState({ loading: false });
     this.props.navigation.navigate('profile');
   }

   handleSubmit = async () => {
      this.setState({ loading: true });
      const { email, displayName } = this.state;
      await this.props.updateUser({ email, displayName });
      this.onUpdateComplete();
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
            <Text style={styles.headingText}>Edit Profile</Text>
          </View>

          {this.renderSpinner}
          
          <FormLabel>Display Name</FormLabel>
          <FormInput
            autoCorrect={false}
            autoCapitalize='none'
            value={this.state.displayName}
            onChangeText={displayName => this.setState({ displayName: displayName.trim() })}
            placeholder={this.state.displayName}
          />

          <FormLabel>Email</FormLabel>
          <FormInput
            autoCorrect={false}
            autoCapitalize='none'
            keyboardType='email-address'
            value={this.state.email}
            onChangeText={email => this.setState({ email: email.trim() })}
            placeholder={this.state.email}
          />

          <Button
            title='SUBMIT'
            buttonStyle={styles.buttonStyle}
            disabledStyle={{ backgroundColor: '#BBDEFB' }}
            onPress={this.handleSubmit}
          />

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5
  },
  form: {
    margin: 10,
    padding: 10,
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: '#fff',
  },
    heading: {
    marginBottom: 10
  },
  headingText: {
    textAlign: 'center',
    fontSize: 25,
    color: BRAND_BLUE,
  },
  buttonStyle: {
    backgroundColor: BRAND_BLUE,
    marginTop: 35
  }
});

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps, { updateUser })(EditProfile);