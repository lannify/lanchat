import React from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  TextInput, 
  ScrollView 
} from 'react-native';
import { FormInput } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import { createChat, fetchChatHistory } from '../../actions';

class ChatRoom extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'ChatRoom',
    headerLeft: null,
    tabBarIcon: <Ionicons name='ios-cog' size={26} color='#fff' />,
    tabBarVisible: false
  });

  state = { text: '', previousTexts: [] };


  componentDidMount() {
    const contactUid = this.props.navigation.state.params.contactUid;
    this.props.fetchChatHistory(contactUid);

  }

  handleSubmit = () => {
    const { text } = this.state;
    const contactUid = this.props.navigation.state.params.contactUid;

    this.refs['newText'].setNativeProps({ text: '' });   
    this.props.createChat(text, contactUid);
  }

  renderMessages = () => {

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textBar}>
          <View style={styles.inputWrapper}>
            <ScrollView scrollEnabled={false}>
              <TextInput
                style={styles.textInput}
                ref={'newText'}
                onChangeText={text => this.setState({ text })} 
                onSubmitEditing={this.handleSubmit}
              />
            </ScrollView>
           
          </View>
         
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  textBar: {
    position: 'absolute', 
    left: 0,
    right: 0, 
    bottom: 0,
    height: 60,
    padding: 5,
    backgroundColor: '#efefef'
  },
  inputWrapper: {
    height: 50
  },
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 5,
    height: 50,
    padding: 10
  }
});

const mapStateToProps = state => ({
  chat: state.chat
})

export default connect(mapStateToProps, { createChat, fetchChatHistory })(ChatRoom);