import {
  createNavigationContainer,
  createStackNavigator,
} from 'react-navigation';
import React from 'react';
import {Image} from 'react-native';

import logo from './assets/logo.png';

import Feed from './pages/Feed';
import New from './pages/New';

export default createNavigationContainer(
  createStackNavigator(
    {
      Feed,
      New,
    },
    {
      defaultNavigationOptions: {
        headerTintColor: '#000',
        headerTitleStyle: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
        // eslint-disable-next-line react-native/no-inline-styles
        headerTitle: <Image style={{marginHorizontal: 20}} source={logo} />,
        headerBackTitle: null,
      },
      mode: 'modal',
    },
  ),
);
