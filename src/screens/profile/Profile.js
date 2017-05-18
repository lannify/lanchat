import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from 'react-native-elements';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import firebase from 'firebase';

import { fetchUser } from '../../actions';
import { BRAND_BLUE } from '../../styles';

class Profile extends React.Component {
   static navigationOptions = ({ navigation }) => ({
      title: 'Profile',
      tabBarIcon: <Ionicons name='md-contact' size={26} color='#fff' />,
      headerLeft: null
   });

   state = { 
     displayName: '', 
     email: ''
    };

   componentDidMount() {
     const { uid } = firebase.auth().currentUser;
     this.props.fetchUser(uid);
   }

   componentWillReceiveProps(nextProps) {
     if (nextProps.user !== null) {
       const user = nextProps.user.user
       this.setState({ 
         displayName: user.displayName,
         email: user.email
        });
     }
   }

   onButtonPress() {
     firebase.auth().signOut();
   }

  render() {

    return (
      <View style={styles.container}>
        <Icon name="face" size={85} iconStyle={styles.icon} color={BRAND_BLUE} />
        <Card>
          <Text style={styles.textStyle}>Email: {this.state.email}</Text>
          <Text style={styles.textStyle}>Display Name: {this.state.displayName}</Text>
        </Card>
        <Button 
          title='LOG OUT'
          backgroundColor={BRAND_BLUE}
          buttonStyle={styles.buttonStyle}
          onPress={this.onButtonPress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textStyle: {
    marginTop: 10
  },
  icon: {
    marginTop: 15
  },
  buttonStyle: {
    marginTop: 20
  }
});

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, {fetchUser})(Profile);