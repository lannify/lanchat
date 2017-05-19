import React from 'react';
import {
  View,
  Text,
  ListView,
  StyleSheet
} from 'react-native';
import {
  FormInput,
  SearchBar,
  Button,
  Avatar,
  ListItem
} from 'react-native-elements';
import { connect } from 'react-redux';

import ContactList from '../../components/ContactList';
import { fetchContacts } from '../../actions';

class NewChat extends React.Component {
  static navigationOptions = ({ navigation }) => {
    title: 'New Chat'
  }

  state = { 
    contacts: [], 
    searchResults: [],
    dataSource:  new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 })
  };

  componentDidMount = async () => {
    await this.props.fetchContacts();

    if (this.props.contacts) {
      this.setState({ contacts: this.props.contacts });
    }
  }

  filterContacts = (term) => {
    const { contacts } = this.state;

    let results = contacts.filter(contact => contact.name.indexOf(term) !== -1);

    if (results.length > 0) {
      this.setState({ dataSource: this.state.dataSource.cloneWithRows(results)});
    }
  }

  renderSearchResults = () => {
    return <ListView
              dataSource={this.state.dataSource}
              renderRow={rowData =>  
                <ListItem
                  key={rowData.uid}
                  roundAvatar
                  title={
                    <View>
                      <Text style={styles.nameText}>{rowData.name}</Text>
                    </View>
                  }
                  avatar={rowData.avatarUrl ? rowData.avatarUrl : require('../../images/default-avatar.png')}
                  avatarStyle={styles.avatarStyle}
                  containerStyle={styles.listItem}
                  onPress={() => this.props.navigation.navigate('chatRoom', { contactUid: rowData.uid })}
                />}
          />;
  }

  render() {
    return (
      <View>
        <SearchBar 
          lightTheme
          onChangeText={searchTerm => this.filterContacts(searchTerm)}
        />
        <View>
          {this.renderSearchResults()}
        </View>
      </View>
    );
  }
}

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

const mapStateToProps = state => ({
  contacts: state.contacts.contactList
})

export default connect(mapStateToProps, {fetchContacts})(NewChat);