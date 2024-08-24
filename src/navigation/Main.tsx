import React, { useState } from 'react';
import Login from '../screens/Login';
import BottomTabNavigator from './BottomTabNavigator';
import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import Payments from '../screens/Payments';

const RootNavigator = () => {

  const [isUser, setisUser] = useState(true)

  if (!isUser) {
    return <Login />
  } else {
    return <Payments />;
  }
};
export default RootNavigator;
