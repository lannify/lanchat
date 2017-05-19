import React from 'react';
import { 
  TabNavigator, 
  StackNavigator, 
  DrawerNavigator 
} from 'react-navigation';

import Feed from '../screens/chats/Feed';
import NewChat from '../screens/chats/NewChat';
import ChatRoom from '../screens/chats/ChatRoom';
import Splash from '../screens/splash/Splash';
import Profile from '../screens/profile/Profile';
import EditProfile from '../screens/profile/EditProfile';
import ContactList from '../screens/contacts/List';
import AddContact from '../screens/contacts/AddContact';
import Settings from '../screens/settings/Settings';
import LogIn from '../screens/unauthorized/Login';
import Register from '../screens/unauthorized/Register';

const AppNavigator = StackNavigator({
  splash: { screen: Splash },
  unauthorized: {
    screen: StackNavigator({
      logIn: { screen: LogIn },
      register: { screen:  Register }
    }, {
      navigationOptions: {
        header: null
      }
    })
  },
  main: { 
    screen: TabNavigator({
      chats: { screen: StackNavigator({  
        feed: { screen: Feed },
        newChat: { screen: NewChat },
        chatRoom: { screen: ChatRoom }
      }, {
        headerMode: 'none'
      })},
      contacts: { 
        screen: StackNavigator({
          contactList: { screen: ContactList },
          addContact:{ screen: AddContact } 
        }, {
          headerMode: 'none'
        })
      },
      settings: { screen: Settings },
      profile: { 
        screen: StackNavigator({
          profile: { screen: Profile },
          editProfile:{ screen: EditProfile } 
        }, {
          headerMode: 'none'
        })
      }  
    }, {
      navigationOptions: {
        headerStyle: { backgroundColor: '#26272b' },
        headerTintColor: '#fff'
      },
      tabBarOptions: {
        style: {
          paddingTop: 5,
          paddingBottom: 5,
          backgroundColor: '#00aeef',
          height: 60
        },
        labelStyle: {
          color: '#fff'
        },
        activeTintColor: '#fff',
        inactiveTintColor: '#efefef'
      },
      lazy: true
    })
  }
}, {
  lazy: true
});

export default AppNavigator;